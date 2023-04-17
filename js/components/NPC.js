AFRAME.registerComponent('NPC', {
    schema: {
        path: { type: 'string', default: null },
        speed: { type: 'number', default: 0.1 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.copy();

        // Helper vector
        this.directionVec3 = new THREE.Vector3();

        if (this.data.path) {
            // Set the model based on a file.
            this.el.setObject3D('NPC_Object', this.data.path);
        }
    },

    tick: function (timeDelta) {
        nextMove(this.data.target, this.el.object3D.position, this.el.object3D.rotation);
        forward(this.el, this.data.target, this.directionVec3, timeDelta, speed);
    }
});
