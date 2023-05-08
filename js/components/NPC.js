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
        chooseType(this.el, true);
        // this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
    },

    tick: function (timeDelta) {
        if (this.data.speed <= 0) {
            chooseType(this.el);
            return;
        }

        // Determine the next target.
        this.path.nextTarget(this.el.object3D.position, timeDelta);

        // Go forwards to the new target.
        // forward(this.el, this.target, this.helperVector, timeDelta, this.data.speed);


        chooseType(this.el);
    }
});
