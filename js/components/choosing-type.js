AFRAME.registerComponent('choosing-type', {
    init: function () {
        // Sets the amount of
        // this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);

        // Initializes the type of the rendering.
        chooseType(this.el, true);
    },

    tick: function (time, timeDelta) {
        // Changes the type of the rendering if needed.
        chooseType(this.el);
    }
})
