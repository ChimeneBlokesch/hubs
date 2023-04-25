function calcAmountLods(npcs, lods) {
    var count = 0;

    for (var npc of npcs) {
        var file = getModelFilename(npc);

        for (var lod of lods) {
            if (file == ROOM.renderingFiles[lod]) {
                count++;
                break;
            }
        }
    }

    return count;
}

function getPositions(npcs) {
    var positions = [];

    for (var npc of npcs) {
        positions.push(npc.object3D.position.clone());
    }

    return positions;
}

function getDistances(npcs) {
    var distances = [];

    for (var npc of npcs) {
        var dist = getUserAvatar().position.distanceTo(npc.object3D.position);
        distances.push(dist);
    }

    return distances;
}

function getModelFilename(el) {
    if (el.getAttribute("gltf-model") == null) {
        return el.getAttribute("geometry");
    }

    return el.getAttribute("gltf-model");
}
