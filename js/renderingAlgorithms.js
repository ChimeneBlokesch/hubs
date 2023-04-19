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

// The used algorithm for rendering.
const RENDERING_ALGO = RENDERING_ALGORITHMS.MODEL_COMBI;

// Below this distance, the low LOD is used.
const RENDERING_DISTANCE_LOW = 50;

// Above this distance, the high LOD is used.
const RENDERING_DISTANCE_HIGH = 150;

// TODO: el should be in a-assets
// The file ids based on the rendering type and optionally the LOD.
RENDERING_FILE = {
    [RENDERING_TYPES.MODEL]: {
        [LOD.LOW]: "#Roman3DLow",
        [LOD.MEDIUM]: "#Roman3DMedium",
        [LOD.HIGH]: "#Roman3DHigh"
    },
    [RENDERING_TYPES.SPRITE]: "#RomanSprite"
    // {
    //     [LOD.LOW]: "#RomanSpriteLow",
    //     [LOD.MEDIUM]: "#RomanSpriteMedium",
    //     [LOD.HIGH]: "#RomanSpriteHigh"
    // }
};

/* Changes the type of the rendering (2D,3D / low, medium, high LOD) if needed.
 * When init is set to true, it will always change. The changes are based
 * on the used rendering algorithm. */
function chooseType(el, init = false) {
    switch (RENDERING_ALGO) {
        case RENDERING_ALGORITHMS.MODEL_LOW:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, RENDERING_FILE[type][LOD.LOW]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_MEDIUM:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, RENDERING_FILE[type][LOD.MEDIUM]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_HIGH:
            // Only specify the type at initialization.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, RENDERING_FILE[type][LOD.HIGH]);
            }

            break;
        case RENDERING_ALGORITHMS.SPRITE:
            // Only specify the type at initialize.
            if (init) {
                var type = RENDERING_TYPES.SPRITE;
                changeType(el, getType(algo), RENDERING_FILE[type]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_COMBI:
            // Choose the type based on the distance to the player.
            var dist = userAvatar.position.distanceTo(el.object3D.position);
            var lod = LOD.MEDIUM;

            if (dist < RENDERING_DISTANCE_LOW) {
                lod = LOD.LOW;
            } else if (dist > RENDERING_DISTANCE_HIGH) {
                lod = LOD.HIGH;
            }

            changeType(el, RENDERING_TYPES.MODEL, RENDERING_FILE[RENDERING_TYPES.MODEL][lod]);
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
