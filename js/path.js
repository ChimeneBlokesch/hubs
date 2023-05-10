class Path {
    constructor(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC, walkReversed = false) {
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;
        this.amountNPCs = amountNPCs;
        this.cellSizeX = cellSizeX;
        this.cellSizeZ = cellSizeZ;
        this.speedNPC = (walkReversed ? -1 : 1) * speedNPC;
        this.rotationNPC = rotationNPC;
        this.direction = this.calcDirection();
        this.directionTemp = new THREE.Vector3();
    }

    /* Returns the length of the path in the x-axis. */
    get lengthX() {
        return this.maxX - this.minX;
    }

    /* Returns the length of the path in the z-axis. */
    get lengthZ() {
        return this.maxZ - this.minZ;
    }

    /* Returns a 'x' when the x-axis is along the width of the path and
     * 'z' otherwise. */
    get widthAxis() {
        return this.lengthX < this.lengthZ ? 'x' : 'z';
    }

    /* The half of the length of the cell in the z-axis. */
    get dx() {
        return this.cellSizeX / 2;
    }

    /* The half of the length of the cell in the z-axis. */
    get dz() {
        return this.cellSizeZ / 2;
    }

    /* Selects the function of corresponding to the width axis,
     * which is the x- or z-axis.  */
    get initNextPosition() {
        switch (this.widthAxis) {
            case 'x':
                return this.initNextPositionX;

            case 'z':
                return this.initNextPositionZ;
        }
    }

    /* Calculates the direction vector based on the speed and width axis. */
    calcDirection() {
        switch (this.widthAxis) {
            case 'x':
                return new THREE.Vector3(0, 0, this.speedNPC);
            case 'z':
                return new THREE.Vector3(this.speedNPC, 0, 0);
        }
    }

    /* Sets the start position of a NPC to the given vector. */
    setStartPosition(vector) {
        if (this.walkReversed) {
            vector.set(this.maxX - this.dx, 0, this.maxZ - this.dz);
            return;
        }

        vector.set(this.minX + this.dx, 0, this.minZ + this.dz);
    }

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionX(curPos) {

        curPos.x += this.cellSizeX;

        if (curPos.x <= this.maxX) {
            return;
        }

        // Go to the beginning of the next row.
        curPos.x = this.minX + this.dx;
        curPos.z += this.dz;
    }

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionZ(curPos) {
        curPos.z += this.cellSizeZ;

        if (curPos.z <= this.maxZ) {
            return;
        }

        // Go to the beginning of the next row.
        curPos.z = this.minZ + this.dz;
        curPos.x += this.dx;

    }

    /* Calculates the next position of a NPC on the path. */
    nextPosition(position, timeDelta) {
        if (this.speedNPC == 0) {
            // No movement.
            return;
        }

        this.directionTemp.copy(this.direction);
        position.add(this.directionTemp.multiplyScalar(timeDelta / 1000));
        this.wrapPosition(position);
    }

    /* Update the position if it's outside the grid to the position in
    * the wrapped grid. Returns true if the update was needed and false otherwise. */
    wrapPosition(position) {
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
}
