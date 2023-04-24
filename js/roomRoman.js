function pathRomanMiddle() {
    var minX = -2;
    var maxX = 2;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 50;
    var cellSizeX = 1;
    var cellSizeZ = 0.8;
    var speedNPC = 0.001;
    var rotationNPC = 0;
    var probForward = 1;
    var probForwardDiag = 0.15;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC, probForward, probForwardDiag);
}

function pathRomanLeft() {
    var minX = -3;
    var maxX = -2;
    var minZ = -100;
    var maxZ = 100;

    var amountNPCs = 10;
    var cellSizeX = 3;
    var cellSizeZ = 1;
    var speedNPC = 0;
    var rotationNPC = 0;
    var probForward = 0;
    var probForwardDiag = 0;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC, probForward, probForwardDiag);
}

function pathRomanRight() {
    var minX = 2;
    var maxX = 3;
    var minZ = -100;
    var maxZ = 100;

    var amountNPCs = 10;
    var cellSizeX = 3;
    var cellSizeZ = 1;
    var speedNPC = 0;
    var rotationNPC = 0;
    var probForward = 0;
    var probForwardDiag = 0;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC, probForward, probForwardDiag);

}

function selectRomanRoom() {

    var paths = [pathRomanMiddle(), pathRomanLeft(), pathRomanRight()];

    var renderingFile = {
        [RENDERING_TYPES.MODEL]: {
            [LOD.LOW]: "models/low/sprite.gltf",
            [LOD.MEDIUM]: "models/medium/sprite.gltf",
            [LOD.HIGH]: "models/high/sprite.gltf"
        },
        [RENDERING_TYPES.SPRITE]: "#RomanSprite"
        // {
        //     [LOD.LOW]: "#RomanSpriteLow",
        //     [LOD.MEDIUM]: "#RomanSpriteMedium",
        //     [LOD.HIGH]: "#RomanSpriteHigh"
        // }
    };

    var renderingAlgo = RENDERING_ALGORITHMS.MODEL_COMBI;
    var renderingDistanceHigh = 5;
    var renderingDistanceLow = 10;

    return new RoomProperties(paths, renderingFile, renderingAlgo,
        renderingDistanceHigh = renderingDistanceHigh, renderingDistanceLow = renderingDistanceLow);
}
