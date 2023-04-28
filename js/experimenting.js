function calcAmountLods(npcs, lods) {
    var count = 0;
    var strLods = lods.map(lod => lod.toString());

    for (var npc of npcs) {
        // var file = getModelFilename(npc);

        for (var child of npc.childNodes) {
            if (strLods.includes(child.getAttribute("lod")) && child.getAttribute("visible")) {
                count++;
            }
            // if (file == ROOM.renderingFiles[lod]) {
            //     count++;
            //     break;
            // }
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


function getRotations(npcs) {
    var rotations = [];

    for (var npc of npcs) {
        rotations.push(npc.object3D.rotation.clone());
    }

    return rotations;
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
