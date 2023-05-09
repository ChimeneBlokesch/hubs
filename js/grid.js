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
        this.speedNPC = speedNPC;
        this.rotationNPC = rotationNPC;
        this.factorWalkReversed = walkReversed ? -1 : 1;
        this.direction = this.calcDirection();
        this.directionTemp = new THREE.Vector3();
    }

    get lengthX() {
        return this.maxX - this.minX;
    }

    get lengthZ() {
        return this.maxZ - this.minZ;
    }

    get widthAxis() {
        return this.lengthX < this.lengthZ ? 'x' : 'z';
    }

    get cellWidth() {
        return this.widthAxis === 'x' ? this.cellSizeX : this.cellSizeZ;
    }

    get startWidthAxis() {
        return this.widthAxis === 'x' ? this.minX : this.minZ;
    }

    get dx() {
        return this.cellSizeX / 2;
    }

    get dz() {
        return this.cellSizeZ / 2;
    }

    calcDirection() {
        switch (this.widthAxis) {
            case 'x':
                return new THREE.Vector3(0, 0, this.factorWalkReversed);
            case 'z':
                return new THREE.Vector3(this.factorWalkReversed, 0, 0);
        }
    }

    setStartPosition(vector) {
        if (this.walkReversed) {
            vector.set(this.maxX - this.dx, 0, this.maxZ - this.dz);
            return;
        }

        vector.set(this.minX + this.dx, 0, this.minZ + this.dz);
    }

    /* Returns the next center. If the width is full, return the center of the
     * cell at the beginning of the next row.  */
    initNextPosition(curPos) {
        switch (this.widthAxis) {
            case 'x':
                curPos.x += this.cellSizeX;

                if (curPos.x > this.maxX) {
                    // Go to the beginning of the next row.
                    curPos.x = this.minX + this.dx;
                    curPos.z += this.dz;
                    break;
                }

                break;
            case 'z':
                curPos.z += this.cellSizeZ;

                if (curPos.z > this.maxZ) {
                    // Go to the beginning of the next row.
                    curPos.z = this.minZ + this.dz;
                    curPos.x += this.dx;
                    break;
                }

                break;
        }
    }

    /* Update the position if it's outside the grid to the position in
    * the wrapped grid. Returns true if the update was needed and false otherwise. */
    wrapPosition(position) {
        var inRangeX = this.minX < position.x && position.x < this.maxX;
        var inRangeZ = this.minZ < position.z && position.z < this.maxZ;

        if (inRangeX && inRangeZ) {
            // No wrapping needed.
            return false;
        }

        if (!inRangeX) {
            var sign = position.x > this.maxX ? -1 : 1;
            position.x += sign * this.lengthX;
        }

        if (!inRangeZ) {
            var sign = position.z > this.maxZ ? -1 : 1;
            position.z += sign * this.lengthZ;
        }

        return true;
    }

    nextPosition(position, timeDelta) {
        var delta = this.speedNPC * timeDelta / 1000;
        this.directionTemp.copy(this.direction);
        position.add(this.directionTemp.multiplyScalar(delta));
        this.wrapPosition(position);
    }
}
