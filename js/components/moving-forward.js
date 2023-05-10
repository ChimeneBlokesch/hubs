AFRAME.registerComponent('moving-forward', {
    schema: {
        pathIndex: { type: 'number', default: 0 }
    },
    init: function () {
        this.path = ROOM.paths[this.data.pathIndex];
    },

    tick: function (time, timeDelta) {
        // Calculates the new position.
        this.path.nextPosition(this.el.object3D.position, timeDelta);
    }
});
