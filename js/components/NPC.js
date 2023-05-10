AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0 },
        pathIndex: { type: 'number', default: 0 }
    },
    init: function () {
        this.path = ROOM.paths[this.data.pathIndex];

        // Sets the amount of
        // this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);

        // Initializes the type of the rendering.
        chooseType(this.el, true);
    },

    tick: function (time, timeDelta) {
        // Calculates the new position.
        this.path.nextPosition(this.el.object3D.position, timeDelta);


        // Changes the type of the rendering if needed.
        chooseType(this.el);
    }
});
