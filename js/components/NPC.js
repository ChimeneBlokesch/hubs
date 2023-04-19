AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0.01 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.clone();

        this.helperVector = new THREE.Vector3();

        chooseType(this.el, init = true);
    },

    tick: function (timeDelta) {
        if (this.data.speed == 0) {
            chooseType(this.el);
            return;
        }

        // Determine the next target.
        nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        // Go forwards to the new target.
        forward(this.el, this.target, this.helperVector, timeDelta, this.data.speed);

        if (wrapPosition(this.el.object3D.position)) {
            // The position is changed, because the target is outside the grid.
            // Determine a new target.
            nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        }

        chooseType(this.el);
    }
});
