AFRAME.registerComponent('rendered-object', {
    schema: {
        // An element with the renderer component.
        renderer: { type: 'selector' }
    },

    init: function () {
        // Initializes the type of the rendering.
        this.rendererData = this.data.renderer.getDOMAttribute("renderer");
        this.rendererComponent = this.data.renderer.components.renderer;

        this.rendererComponent.chooseType(this.el, true);

        if (ALGO2LOD[this.rendererData.renderingAlgo] != null) {
            // No need to update the type of the rendering. Therefore
            // this component isn't needed anymore.
            this.el.removeAttribute("rendered-object");
            return;
        }

        // this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);
    },

    tick: function (time, timeDelta) {
        // Changes the type of the rendering if needed.
        this.rendererComponent.chooseType(this.el);
    }
})
