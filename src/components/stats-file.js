AFRAME.registerComponent('stats-file', {
    dependencies: ['stats'],
    schema: {
        // To ignore the loading time, set 'start' to a value greater than 3.
        start: { type: 'number', default: 3 },
        // The amount of seconds to be logged to a file.
        seconds: { type: 'number' },
        // True if the stats should be downloaded to a file.
        download: { type: 'boolean', default: true },
        // Name of the file to download.
        downloadfilename: { type: 'string', default: 'stats.json' },
        // True if the stats should be logged to the console.
        log: { type: 'boolean', default: true },
        // True if the pageg should be reloaded after the stats are logged.
        reload: { type: 'boolean', default: false },
        // Function without parameters stored in the 'window' global variable.
        onremove: { type: 'string' }
    },

    init: function () {
        this.statsComponent = this.el.components.stats;

        this.secondsValues = [];
        this.fpsValues = [];
        this.rafValues = [];

        this.curSeconds = 0;
        this.endTime = this.data.start + this.data.seconds;
    },

    tick: function (time, timeDelta) {
        this.curSeconds += timeDelta / 1000;

        if (this.curSeconds < this.data.start) {
            // Ignore the loading time.
            return;
        }

        if (this.curSeconds > this.endTime) {
            // Log the results to the file and delete this component.
            this.showStatsValues();

            if (this.data.reload) {
                location.reload();
            }

            this.el.removeComponent('stats-file');
            return;
        }

        this.secondsValues.push(this.curSeconds);
        this.fpsValues.push(this.getStatsValue('FPS'));
        this.rafValues.push(this.getStatsValue('rAF'));
    },

    /* Call the given 'onremove' function if it's in 'window'.  */
    remove: function () {
        var func = window[this.data.onremove];

        if (func == null) {
            return;
        }

        func();
    },

    getStatsValue: function (name) {
        return this.statsComponent.stats(name).value();
    },


    showStatsValues: function () {
        if (this.data.log) {
            this.logStatsValues();
        }

        if (this.data.download) {
            this.downloadStatsValues();
        }
    },

    logStatsValues: function () {
        console.log({
            "time": this.secondsValues,
            "fps": this.fpsValues,
            "raf": this.rafValues
        });
    },

    downloadStatsValues: function () {
        var data = {
            "time": this.secondsValues,
            "fps": this.fpsValues,
            "raf": this.rafValues
        };

        var blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
        var a = document.createElement('a');
        a.download = this.data.downloadfilename;
        a.href = URL.createObjectURL(blob);
        a.click();
    }
})
