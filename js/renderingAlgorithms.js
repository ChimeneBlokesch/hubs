const RENDERING_ALGORITHMS = {
    MODEL_LOW: 0,
    MODEL_MEDIUM: 1,
    MODEL_HIGH: 2,
    MODEL_COMBI: 3,
    SPRITE: 4
}

const RENDERING_TYPES = {
    MODEL: 0,
    SPRITE: 1
}

// Level of detail
const LOD = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
}

const RENDERING_ALGO = RENDERING_ALGORITHMS.COMBI;

// Below this distance, the low LOD is used.
const RENDERING_DISTANCE_LOW = 50;

// Above this distance, the high LOD is used.
const RENDERING_DISTANCE_HIGH = 150;

// TODO: el should be in a-assets
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


function chooseType(el, init = false) {
    switch (RENDERING_ALGO) {
        case RENDERING_ALGORITHMS.MODEL_LOW:
            // Only specify the type at initialize.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, RENDERING_FILE[type][LOD.LOW]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_MEDIUM:
            // Only specify the type at initialize.
            if (init) {
                var type = RENDERING_TYPES.MODEL;
                changeType(el, type, RENDERING_FILE[type][LOD.MEDIUM]);
            }

            break;
        case RENDERING_ALGORITHMS.MODEL_HIGH:
            // Only specify the type at initialize.
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
            var dist = userAvatar.position.distanceTo(el.position);
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

function changeType(el, type, file) {
    switch (type) {
        case RENDERING_TYPES.MODEL:
            el.removeAttribute("src");
            el.setAttribute("gltf-model", file);
            break;
        case RENDERING_TYPES.SPRITE:
            el.removeAttribute("gltf-model");
            el.setAttribute("src", file);
            break;
        default:
            break;
    }

}
