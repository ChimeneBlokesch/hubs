AFRAME.registerComponent('stats-file', {
    dependencies: ['stats'],
    schema: {
        // The amount of seconds to be logged to a file.
        seconds: { type: 'number' }
    },

    init: function () {
        this.statsComponent = this.el.components.stats;

        this.secondsValues = [];
        this.fpsValues = [];
        this.rafValues = [];

        this.remainingSeconds = this.data.seconds;
        this.curSeconds = 0;
    },

    tick: function (time, timeDelta) {
        this.curSeconds += timeDelta / 1000;

        if (this.curSeconds > this.data.seconds) {
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
        if (name == "FPS") {
            console.log(this.statsComponent.stats(name).value());
        }

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
