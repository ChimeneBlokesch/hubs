AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0.1 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.clone();

        this.helperVector = new THREE.Vector3();
    },

    tick: function (timeDelta) {
        if (this.data.speed == 0) {
            return;
        }

        // Determine the next target.
        nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        console.log("target", this.target);
        // Go forwards to the new target.
        forward(this.el, this.target, this.helperVector, timeDelta, this.data.speed);

        // TODO: wrap grid, if NPC becomes outside bounds, teleport to beginning
        // and calculate new target. So target can be outside grid.

        if (wrapPosition(this.el.object3D.position)) {

        }
    }
});
