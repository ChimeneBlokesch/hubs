// Different algorithms for rendering.
const RENDERING_ALGORITHMS = {
    // All models are shown as 3D models with low LOD.
    MODEL_LOW: 0,
    // All models are shown as 3D models with medium LOD.
    MODEL_MEDIUM: 1,
    // All models are shown as 3D models with high LOD.
    MODEL_HIGH: 2,
    // Combines the three LODs, depending on the distance to
    // the avatar of the user.
    MODEL_COMBI: 3,
    // All models are shown as 2D sprites.
    SPRITE: 4,
    // Combines the sprite and the three LODs, depending on the distance to
    // the avatar of the user.
    MODEL_COMBI_SPRITE: 5,
}

// Level of detail
const LOD = {
    SPRITE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
}

/* Changes the type of the rendering (2D / 3D and low / medium / high LOD) if needed.
 * When init is set to true, it will always change. The changes are based
 * on the used rendering algorithm. */
function chooseType(el, init = false) {
    switch (ROOM.renderingAlgo) {
        case RENDERING_ALGORITHMS.MODEL_LOW:
            // Only specify the lod at initialization.
            if (init) {
                changeType(el, LOD.LOW);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_MEDIUM:
            // Only specify the lod at initialization.
            if (init) {
                changeType(el, LOD.MEDIUM);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_HIGH:
            // Only specify the lod at initialization.
            if (init) {
                changeType(el, LOD.HIGH);
            }

            break;
        case RENDERING_ALGORITHMS.SPRITE:
            // Only specify the lod at initialize.
            if (init) {
                changeType(el, LOD.SPRITE);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_COMBI:
            // Choose the lod based on the distance to the player.
            var dist = getUserAvatar().position.distanceTo(el.object3D.position);
            var lod = lodFromDistance(dist, ROOM.thHighMedium, ROOM.thMediumLow);
            changeType(el, lod);
            break;
        case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
            // Choose the lod based on the distance to the player.
            var dist = getUserAvatar().position.distanceTo(el.object3D.position);
            var lod = lodFromDistance(dist, ROOM.thHighMedium,
                ROOM.thMediumLow, ROOM.thLowSprite);
            changeType(el, lod);
            break;
        default:
            break;
    }
}

/* Changes the rendering type by setting the right attribute and removing the
 * other attribute. */
function changeType(el, lod) {
    if (el.childCount == 0) {
        el.appendChild(loadModel(lod));
        return;
    }

    var found = false;

    for (var child of el.children) {
        if (child.getAttribute("lod") == lod) {
            child.setAttribute("visible", "true");
            found = true;
            return;
        }

        child.setAttribute("visible", "false");
    }

    if (!found) {
        el.appendChild(loadModel(lod));
    }
}

function loadModel(lod) {
    var file = ROOM.renderingFiles[lod];
    var modelEl = document.createElement("a-entity");
    modelEl.setAttribute("lod", lod);
    modelEl.setAttribute("visible", "true");

    switch (lod) {
        case LOD.SPRITE:
            // TODO: maybe add a position offset to the sprite.
            modelEl.setAttribute("geometry", "primitive", "plane");
            modelEl.setAttribute("material", "src", file);
            break;
        default:
            modelEl.setAttribute("gltf-model", file);
            break;
    }

    return modelEl;
}

function lodFromDistance(value, thHighMedium, thMediumLow, thLowSprite = null) {
    if (value < thHighMedium) {
        return LOD.HIGH;
    }

    if (value < thMediumLow) {
        return LOD.MEDIUM;
    }

    if (thLowSprite == null || value < thLowSprite) {
        return LOD.LOW;
    }

    return LOD.SPRITE;
}
