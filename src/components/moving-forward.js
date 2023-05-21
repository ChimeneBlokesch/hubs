AFRAME.registerComponent('moving-forward', {
    schema: {
        // An element with the path component.
        pathEl: { type: 'selector' }
    },

    /* Update the position per frame. */
    tick: function (time, timeDelta) {
        // Calculates the new position.
        this.data.pathEl.components.path.nextPosition(this.el.object3D.position,
            timeDelta);
    }
});
