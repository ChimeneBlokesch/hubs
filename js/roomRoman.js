function pathRomanMiddle() {
    var minX = -2;
    var maxX = 2;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 100;
    var cellSizeX = 1;
    var cellSizeZ = 0.8;
    var speedNPC = 0.01;
    var rotationNPC = 0;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);
}

function pathRomanLeft() {
    var minX = -4;
    var maxX = -3;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 100;
    var cellSizeX = 1;
    var cellSizeZ = 0.8;
    var speedNPC = 0;
    var rotationNPC = Math.PI / 2;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);
}

function pathRomanRight() {
    var minX = 3;
    var maxX = 4;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 100;
    var cellSizeX = 1;
    var cellSizeZ = 0.8;
    var speedNPC = 0;
    var rotationNPC = -Math.PI / 2;

    return new Path(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);

}

function selectRomanRoom() {
    var paths = [pathRomanMiddle(), pathRomanLeft(), pathRomanRight()];

    var renderingFile = {
        [LOD.SPRITE]: "models/sprite/spriteNPC.png",
        [LOD.LOW]: "models/low/sprite.glb",
        [LOD.MEDIUM]: "models/medium/sprite.glb",
        [LOD.HIGH]: "models/high/sprite.glb"
    };

    var renderingAlgo = RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE;
    var thHighMedium = 2;
    var thMediumLow = 5;
    var thLowSprite = 10;

    return new RoomProperties(paths, renderingFile, renderingAlgo,
        thHighMedium, thMediumLow, thLowSprite);
}
