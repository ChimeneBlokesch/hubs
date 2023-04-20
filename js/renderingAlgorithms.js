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
    SPRITE: 4
}

// Rendering type based on amount of dimensions.
const RENDERING_TYPES = {
    // 2D
    SPRITE: 0,
    // 3D
    MODEL: 1
}

// Level of detail
const LOD = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
}

/* Changes the type of the rendering (2D / 3D and low / medium / high LOD) if needed.
 * When init is set to true, it will always change. The changes are based
 * on the used rendering algorithm. */
function chooseType(el, init = false) {
    switch (ROOM.renderingAlgo) {
        case RENDERING_ALGORITHMS.MODEL_LOW:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, ROOM.renderingFiles[type][LOD.LOW]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_MEDIUM:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, ROOM.renderingFiles[type][LOD.MEDIUM]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_HIGH:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, ROOM.renderingFiles[type][LOD.HIGH]);
            }

            break;
        case RENDERING_ALGORITHMS.SPRITE:
            // Only specify the type at initialize.
            if (init) {
                var type = RENDERING_TYPES.SPRITE;
                changeType(el, getType(algo), ROOM.renderingFiles[type]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_COMBI:
            // Choose the type based on the distance to the player.
            var dist = userAvatar.position.distanceTo(el.object3D.position);
            var lod = LOD.MEDIUM;

            if (dist < ROOM.renderingDistanceHigh) {
                lod = LOD.HIGH;
            } else if (dist > ROOM.renderingDistanceLow) {
                lod = LOD.LOW;
            }

            changeType(el, RENDERING_TYPES.MODEL,
                ROOM.renderingFiles[RENDERING_TYPES.MODEL][lod]);
            break;
        default:
            break;
    }
}

/* Changes the rendering type by setting the right attribute and removing the
 * other attribute. */
function changeType(el, type, file) {
    switch (type) {
        case RENDERING_TYPES.MODEL:
            el.removeAttribute("src");
            el.setAttribute("gltf-model-plus", file);
            break;
        case RENDERING_TYPES.SPRITE:
            el.removeAttribute("gltf-model-plus");
            el.setAttribute("src", file);
            break;
        default:
            break;
    }

}
