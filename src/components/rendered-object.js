AFRAME.registerComponent('rendered-object', {
    schema: {
        // An element with the renderer component.
        renderer: { type: 'selector' }
    },

    init: function () {
        // Initializes the type of the rendering.
        // var rendererData = this.data.renderer.getDOMAttribute("renderer");
        this.rendererComponent = this.data.renderer.components.renderer;

        // Initialize the type of the rendering.
        this.rendererComponent.chooseType(this.el, true);
    },

    tick: function (time, timeDelta) {
        // Changes the type of the rendering.
        this.rendererComponent.chooseType(this.el);
    }
})
