class RoomProperties {
    constructor(minX, maxX, minZ, maxZ, amountNPCs, probForward, probForwardDiag, cellSize,
        renderingFiles, renderingAlgo,
        renderingDistanceHigh = null, renderingDistanceLow = null) {
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;
        this.amountNPCs = amountNPCs;
        this.probForward = probForward;
        this.probForwardDiag = probForwardDiag;
        this.cellSize = cellSize;
        this.renderingFiles = renderingFiles;
        this.renderingAlgo = renderingAlgo;
        this.renderingDistanceHigh = renderingDistanceHigh;
        this.renderingDistanceLow = renderingDistanceLow;
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

    get angleDiag() {
        return Math.cos(CELL_SIZE / CELL_SIZE);
    }
}
