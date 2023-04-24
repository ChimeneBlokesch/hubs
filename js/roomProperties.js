class RoomProperties {
    constructor(paths, renderingFiles, renderingAlgo,
        renderingDistanceHigh = null, renderingDistanceLow = null) {
        this.paths = paths;

        this.renderingFiles = renderingFiles;
        this.renderingAlgo = renderingAlgo;
        this.renderingDistanceHigh = renderingDistanceHigh;
        this.renderingDistanceLow = renderingDistanceLow;
    }
}
