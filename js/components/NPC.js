AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0 },
        pathIndex: { type: 'number', default: 0 }
    },
    init: function () {
        this.path = ROOM.paths[this.data.pathIndex];
        chooseType(this.el, true);
        // this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
    },

    tick: function (timeDelta) {
        if (this.data.speed <= 0) {
            chooseType(this.el);
            return;
        }

        this.path.nextPosition(this.el.object3D.position, timeDelta);
        chooseType(this.el);
    }
});
