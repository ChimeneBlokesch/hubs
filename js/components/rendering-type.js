AFRAME.registerComponent('rendering-type', {
    init: function () {
        // Sets the amount of
        // this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);

        // Initializes the type of the rendering.
        chooseType(this.el, true);

        if (ALGO2LOD[ROOM.renderingAlgo] != null) {
            // No need to update the type of the rendering.
            this.tick = null;
            return;
        }

        this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);
    },

    tick: function (time, timeDelta) {
        // Changes the type of the rendering if needed.
        chooseType(this.el);
    }
})
