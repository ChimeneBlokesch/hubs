class Path {
    constructor(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC) {
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;
        this.amountNPCs = amountNPCs;
        this.cellSizeX = cellSizeX;
        this.cellSizeZ = cellSizeZ;
        this.speedNPC = speedNPC;
        this.rotationNPC = rotationNPC;
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

    /* Returns the next center. If the width is full, return the center of the
     * cell at the beginning of the next row.  */
    initNextPosition(curPosX, curPosZ) {
        // First full up the width axis, then the length axis.
        if (curPosX == null || curPosZ == null) {
            curPosX = this.minX + this.cellSizeX / 2;
            curPosZ = this.minZ + this.cellSizeZ / 2;
            return [curPosX, curPosZ];
        }

        switch (this.widthAxis) {
            case 'x':
                if (curPosX + this.cellSizeX > this.maxX) {
                    // Go to the beginning of the next row.
                    return [this.minX + this.cellSizeX / 2, curPosZ + this.cellSizeZ];
                }

                curPosX += this.cellSizeX;
                break;
            case 'z':
                if (curPosZ + this.cellSizeZ > this.maxZ) {
                    // Go to the beginning of the next row.
                    return [curPosX + this.cellSizeX, this.minZ + this.cellSizeZ / 2];
                }

                curPosZ += this.cellSizeZ;
                break;
        }

        return [curPosX, curPosZ];
    }

    nextPosition(position, timeDelta) {
        var delta = this.speedNPC * timeDelta / 1000;

        switch (this.widthAxis) {
            case 'x':
                position.z += delta;
                break;
            case 'z':
                position.x += delta;
                break;
        }

        this.wrapPosition(position);
    }
}
