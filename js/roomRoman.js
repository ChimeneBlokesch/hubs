function selectRomanRoom() {
    var minX = -2;
    var maxX = 2;
    var minZ = -100;
    var maxZ = 100;

    var amountNPCs = 100;
    var cellSize = 1;
    var speedNPC = 0.001;
    var rotationNPC = 0;
    var probForward = 1;
    var probForwardDiag = 0.15;

    var paths = [new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSize,
        speedNPC, rotationNPC, probForward, probForwardDiag)];

    var renderingFile = {
        [RENDERING_TYPES.MODEL]: {
            [LOD.LOW]: "#Roman3DLow",
            [LOD.MEDIUM]: "#Roman3DMedium",
            [LOD.HIGH]: "#Roman3DHigh"
        },
        [RENDERING_TYPES.SPRITE]: "#RomanSprite"
        // {
        //     [LOD.LOW]: "#RomanSpriteLow",
        //     [LOD.MEDIUM]: "#RomanSpriteMedium",
        //     [LOD.HIGH]: "#RomanSpriteHigh"
        // }
    };

    var renderingAlgo = RENDERING_ALGORITHMS.MODEL_COMBI;
    var renderingDistanceHigh = 50;
    var renderingDistanceLow = 150;

    return new RoomProperties(paths, renderingFile, renderingAlgo,
        renderingDistanceHigh = renderingDistanceHigh, renderingDistanceLow = renderingDistanceLow);
}
