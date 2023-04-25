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
        [LOD.LOW]: "models/low/sprite.gltf",
        [LOD.MEDIUM]: "models/medium/sprite.gltf",
        [LOD.HIGH]: "models/high/sprite.gltf",
        [LOD.SPRITE]: "models/sprite/sprite.png"
    };

    var renderingAlgo = RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE;
    var thHighMedium = 2;
    var thMediumLow = 5;
    var thLowSprite = 10;

    return new RoomProperties(paths, renderingFile, renderingAlgo,
        thHighMedium, thMediumLow, thLowSprite);
}
