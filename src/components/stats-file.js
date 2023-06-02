AFRAME.registerComponent('stats-file', {
    dependencies: ['stats'],
    schema: {
        // To ignore the loading time, set 'start' to a value greater than 3.
        start: { type: 'number', default: 3 },
        // The amount of seconds to be logged to a file.
        seconds: { type: 'number' }
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
            this.el.removeComponent('stats-file');
            return;
        }

        this.secondsValues.push(this.curSeconds);
        this.fpsValues.push(this.getStatsValue('FPS'));
        this.rafValues.push(this.getStatsValue('rAF'));
    },

    getStatsValue: function (name) {
        return this.statsComponent.stats(name).value();
    },

    showStatsValues: function () {
        console.log({
            "time": this.secondsValues,
            "fps": this.fpsValues,
            "raf": this.rafValues
        });
    }
})
