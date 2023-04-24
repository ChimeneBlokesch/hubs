AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0 },
        pathIndex: { type: 'number', default: 0 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.clone();

        this.helperVector = new THREE.Vector3();
        this.path = ROOM.paths[this.data.pathIndex];

        chooseType(this.el, init = true);
    },

    tick: function (timeDelta) {
        if (this.data.speed <= 0) {
            chooseType(this.el);
            return;
        }

        // Determine the next target.
        nextTarget(this.path, this.target, this.el.object3D.position, this.el.object3D.rotation);

        // Go forwards to the new target.
        forward(this.el, this.target, this.helperVector, timeDelta, this.data.speed);

        this.path.wrapPosition(this.el.object3D.position);

        chooseType(this.el);
    }
});
