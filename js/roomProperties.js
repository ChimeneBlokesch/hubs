function getScene() {
    return document.querySelector("a-scene");
}

function createPath(parent, id, minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
    speedNPC, rotationNPC, idRenderer) {
    var el = document.createElement("a-entity");
    el.setAttribute("id", id);

    el.setAttribute("path", {
        "minX": minX,
        "maxX": maxX,
        "minZ": minZ,
        "maxZ": maxZ,
        "amountNPCs": amountNPCs,
        "cellSizeX": cellSizeX,
        "cellSizeZ": cellSizeZ,
        "speedNPC": speedNPC,
        "rotationNPC": rotationNPC,
        "idRenderer": idRenderer
    });

    parent.appendChild(el);
}

function createRenderer(parent, id, renderingFile, renderingAlgo, thHighMedium, thMediumLow, thLowSprite) {
    var el = document.createElement("a-entity");
    el.setAttribute("id", id);

    el.setAttribute("renderer", {
        "renderingFiles": renderingFile,
        "renderingAlgo": renderingAlgo,
        "thHighMedium": thHighMedium,
        "thMediumLow": thMediumLow,
        "thLowSprite": thLowSprite
    });

    parent.appendChild(el);
}
