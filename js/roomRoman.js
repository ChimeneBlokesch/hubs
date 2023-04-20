function selectRomanRoom() {
    var minX = -100;
    var maxX = 100;
    var minZ = -100;
    var maxZ = 100;

    var amountNPCs = 100;
    var probForward = 0.5;
    var probForwardDiag = 0.5;
    var cellSize = 1;

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

    return new RoomProperties(minX, maxX, minZ, maxZ, amountNPCs,
        probForward, probForwardDiag, cellSize,
        renderingFile, renderingAlgo,
        renderingDistanceHigh = renderingDistanceHigh, renderingDistanceLow = renderingDistanceLow);
}
