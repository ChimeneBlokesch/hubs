AFRAME.registerComponent('path', {
    schema: {
        minX: { type: 'number', default: 0 },
        maxX: { type: 'number', default: 0 },
        minZ: { type: 'number', default: 0 },
        maxZ: { type: 'number', default: 0 },
        amountNPCs: { type: 'number', default: 0 },
        cellSizeX: { type: 'number', default: 0 },
        cellSizeZ: { type: 'number', default: 0 },
        speedNPC: { type: 'number', default: 0 },
        rotationNPC: { type: 'number', default: 0 },
        walkReversed: { type: 'boolean', default: false },
    },

    init: function () {
        this.direction = this.calcDirection();
        this.directionTemp = new THREE.Vector3();
        this.lengthX = this.maxX - this.minX;
        this.lengthZ = this.maxZ - this.minZ;
        this.widthAxis = this.lengthX < this.lengthZ ? 'x' : 'z';
        this.dx = this.cellSizeX / 2;
        this.dz = this.cellSizeZ / 2;
    },

    /* Selects the function of corresponding to the width axis,
     * which is the x- or z-axis.  */
    initNextPosition: function () {
        switch (this.widthAxis) {
            case 'x':
                return this.initNextPositionX;

            case 'z':
                return this.initNextPositionZ;
        }
    },

    /* Calculates the direction vector based on the speed and width axis. */
    calcDirection: function () {
        switch (this.widthAxis) {
            case 'x':
                return new THREE.Vector3(0, 0, this.speedNPC);
            case 'z':
                return new THREE.Vector3(this.speedNPC, 0, 0);
        }
    },

    /* Sets the start position of a NPC to the given vector. */
    setStartPosition: function (vector) {
        if (this.walkReversed) {
            vector.set(this.maxX - this.dx, 0, this.maxZ - this.dz);
            return;
        }

        vector.set(this.minX + this.dx, 0, this.minZ + this.dz);
    },

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionX: function (curPos) {

        curPos.x += this.cellSizeX;

        if (curPos.x <= this.maxX) {
            return;
        }

        // Go to the beginning of the next row.
        curPos.x = this.minX + this.dx;
        curPos.z += this.dz;
    },

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionZ: function (curPos) {
        curPos.z += this.cellSizeZ;

        if (curPos.z <= this.maxZ) {
            return;
        }

        // Go to the beginning of the next row.
        curPos.z = this.minZ + this.dz;
        curPos.x += this.dx;

    },

    /* Calculates the next position of a NPC on the path. */
    nextPosition: function (position, timeDelta) {
        if (this.speedNPC == 0) {
            // No movement.
            return;
        }

        this.directionTemp.copy(this.direction);
        position.add(this.directionTemp.multiplyScalar(timeDelta / 1000));
        this.wrapPosition(position);
    },

    /* Update the position if it's outside the grid to the position in
    * the wrapped grid. Returns true if the update was needed and false otherwise. */
    wrapPosition: function (position) {
        if (position.x < this.minX) {
            position.x += this.lengthX;
        } else if (position.x > this.maxX) {
            position.x -= this.lengthX;
        }

        if (position.z < this.minZ) {
            position.z += this.lengthZ;
        } else if (position.z > this.maxZ) {
            position.z -= this.lengthZ;
        }
    }
});
