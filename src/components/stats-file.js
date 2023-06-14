// Server
// var STATS = "stats-plus";

// Local
var STATS = "stats";

AFRAME.registerComponent('stats-file', {
    schema: {
        // To ignore the loading time, set 'start' to a value greater than 3.
        start: { type: 'number', default: 3 },
        // The amount of seconds to be logged to a file.
        seconds: { type: 'number' },
        // Name of the file to download.
        downloadfilename: { type: 'string', default: '' },
        // True if the stats should be logged to the console.
        log: { type: 'boolean', default: false },
        // Function without parameters stored in the 'window' global variable.
        // It's called when the time ended.
        onstop: { type: 'string' }
    },

    init: function () {
        // Ensure there is a stats component.
        this.el.setAttribute(STATS, true);

        // Use the statsComponent to get the statistics.
        this.statsComponent = this.el.components[STATS];

        if (window.APP != null) {
            // Ensure the statistics are logged.
            window.APP.store.state.preferences.showFPSCounter = true;
        }
    },

    /* Starts logging time, framerate and latency. */
    update: function () {
        this.secondsValues = [];
        this.fpsValues = [];
        this.rafValues = [];

        this.curSeconds = 0;
        this.endTime = this.data.start + this.data.seconds;
        this.hasEnded = false;
    },

    tick: function (time, timeDelta) {
        if (this.hasEnded) {
            // Don't log the statistics.
            return;
        }

        this.curSeconds += timeDelta / 1000;

        if (this.curSeconds < this.data.start) {
            // Ignore the loading time.
            return;
        }

        if (this.curSeconds > this.endTime) {
            // Log the results to the file and delete this component.
            this.showStatsValues();
            this.stop();
            return;
        }

        this.secondsValues.push(this.curSeconds);
        this.fpsValues.push(this.getStatsValue('FPS'));
        this.rafValues.push(this.getStatsValue('rAF'));
    },

    /* Call the given 'onstop' function if it's in 'window'.  */
    stop: function () {
        this.hasEnded = true;
        var func = window[this.data.onstop];

        if (func == null) {
            return;
        }

        func();
    },

    /* Returns the value for the FPS or rAF. */
    getStatsValue: function (name) {
        return this.statsComponent.stats(name).value();
    },

    /* Shows the results by printing it to the console or
     * downloading a file. */
    showStatsValues: function () {
        if (this.data.log) {
            this.logStatsValues();
        }

        if (this.data.downloadfilename != null) {
            this.downloadStatsValues();
        }
    },

    /* Show the results in the log. */
    logStatsValues: function () {
        console.log({
            "time": this.secondsValues,
            "fps": this.fpsValues,
            "raf": this.rafValues
        });
    },

    /* Download the results. */
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
