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

// One-to-one mapping from rendering algorithm to LOD.
const ALGO2LOD = {
    [RENDERING_ALGORITHMS.SPRITE]: LOD.SPRITE,
    [RENDERING_ALGORITHMS.MODEL_LOW]: LOD.LOW,
    [RENDERING_ALGORITHMS.MODEL_MEDIUM]: LOD.MEDIUM,
    [RENDERING_ALGORITHMS.MODEL_HIGH]: LOD.HIGH
}

/* Changes the type of the rendering (2D / 3D and low / medium / high LOD) if needed.
 * When init is set to true, it will always change. The changes are based
 * on the used rendering algorithm. */
function chooseType(el, init = false) {
    var thLowSprite;

    switch (ROOM.renderingAlgo) {
        case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
            // Only set threshold when sprites are used.
            thLowSprite = ROOM.thLowSprite;
        case RENDERING_ALGORITHMS.MODEL_COMBI:
            // Choose the lod based on the distance to the player.
            var dist = getUserAvatar().position.distanceTo(el.object3D.position);
            var lod = lodFromDistance(dist, ROOM.thHighMedium,
                ROOM.thMediumLow, thLowSprite);
            setModel(el, lod);
            break;
        default:
            // Only specify the lod at initialization.
            if (init) {
                setModel(el, ALGO2LOD[ROOM.renderingAlgo]);
            }
            break;
    }
}

/* Sets the model corresponding to the LOD to the object. */
function setModel(el, lod) {
    if (el.getAttribute("lod") == lod) {
        // No change.
        return;
    }

    // Assure the model is loaded.
    ROOM.loadModel(lod);

    // Remove the old model.
    el.removeAttribute("instanced-mesh-member");

    // Add the new model.
    el.setAttribute("instanced-mesh-member", "mesh:#lod" + lod);
}

/* Determines the LOD based on the distance and the thresholds.  */
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
