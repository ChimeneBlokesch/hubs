AFRAME.registerComponent('rendering-type', {
    schema: {
        renderer: { type: 'selector' }
    },

    init: function () {
        // Sets the amount of
        // this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);

        // Initializes the type of the rendering.
        this.rendererData = this.data.renderer.getDOMAttribute("renderer");
        this.rendererComponent = this.data.renderer.components.renderer;

        this.rendererComponent.chooseType(this.el, true);

        if (ALGO2LOD[this.rendererData.renderingAlgo] != null) {
            // No need to update the type of the rendering.
            this.tick = null;
            return;
        }

        this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);
    },

    tick: function (time, timeDelta) {
        // Changes the type of the rendering if needed.
        this.rendererComponent.chooseType(this.el);
    }
})
