function pathRomanMiddle(parent) {
    var id = "mid";
    var minX = -2;
    var maxX = 2;
    var minZ = -100;
    var maxZ = 100;

    var amountNPCs = 300;
    var cellSizeX = 1;
    var cellSizeZ = 2;
    var speedNPC = 0.2;
    var rotationNPC = 0;

    createPath(parent, id, minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);

    return id;
}

function pathRomanLeft(parent) {
    var id = "left";
    var minX = -4;
    var maxX = -3;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 200;
    var cellSizeX = 1;
    var cellSizeZ = 2;
    var speedNPC = 0;
    var rotationNPC = Math.PI / 2;

    createPath(parent, id, minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);

    return id;
}

function pathRomanRight(parent) {
    var id = "right";
    var minX = 3;
    var maxX = 4;
    var minZ = -50;
    var maxZ = 50;

    var amountNPCs = 200;
    var cellSizeX = 1;
    var cellSizeZ = 2;
    var speedNPC = 0;
    var rotationNPC = -Math.PI / 2;

    createPath(parent, id, minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC);

    return id;

}

window.onload = function () {
    var parent = getScene();
    var idPaths = [pathRomanMiddle(parent), pathRomanLeft(parent), pathRomanRight(parent)];

    var renderingFile = {
        [LOD.SPRITE]: "models/sprite/spriteNPC.png",
        [LOD.LOW]: "models/low/sprite.glb",
        [LOD.MEDIUM]: "models/medium/sprite.glb",
        [LOD.HIGH]: "models/high/sprite.glb"
    };

    var idRenderer = "renderer";
    var renderingAlgo = RENDERING_ALGORITHMS.SPRITE;
    var thHighMedium = 2;
    var thMediumLow = 5;
    var thLowSprite = 10;

    createRenderer(parent, idRenderer, renderingFile, renderingAlgo,
        thHighMedium, thMediumLow, thLowSprite);

    initializeNPCs(idPaths, idRenderer);
}

// function selectRomanRoom() {
//     var paths = {
//         "mid": pathRomanMiddle(),
//         "left": pathRomanLeft(),
//         "right": pathRomanRight()
//     };

//     var renderingFile = {
//         [LOD.SPRITE]: "models/sprite/spriteNPC.png",
//         [LOD.LOW]: "models/low/sprite.glb",
//         [LOD.MEDIUM]: "models/medium/sprite.glb",
//         [LOD.HIGH]: "models/high/sprite.glb"
//     };

//     var renderingAlgo = RENDERING_ALGORITHMS.SPRITE;
//     var thHighMedium = 2;
//     var thMediumLow = 5;
//     var thLowSprite = 10;

//     return new RoomProperties(paths, renderingFile, renderingAlgo,
//         thHighMedium, thMediumLow, thLowSprite);
// }
