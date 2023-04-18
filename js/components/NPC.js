AFRAME.registerComponent('NPC', {
    schema: {
        speed: { type: 'number', default: 0.1 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.copy();

        // Helper vector
        this.directionVec3 = new THREE.Vector3();
    },

    tick: function (timeDelta) {
        // Determine the next target.
        nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        // Go forwards to the new target.
        forward(this.el, this.target, this.directionVec3, timeDelta, speed);
    }
});
