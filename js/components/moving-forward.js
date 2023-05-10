AFRAME.registerComponent('moving-forward', {
    schema: {
        pathEl: { type: 'selector' }
    },
    init: function () {
        this.pathComponent = this.data.pathEl.components.path;
    },

    tick: function (time, timeDelta) {
        // Calculates the new position.
        this.pathComponent.nextPosition(this.el.object3D.position, timeDelta);
    }
});
