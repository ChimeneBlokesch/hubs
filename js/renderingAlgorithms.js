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
const RENDERING_DISTANCE = 50;

// TODO: this should be in a-assets
RENDERING_FILE = {
    [RENDERING_TYPES.MODEL]: {
        [LOD.LOW]: "#Roman3DLow",
        [LOD.MEDIUM]: "#Roman3DMedium",
        [LOD.HIGH]: "#Roman3DHigh"
    },
    [RENDERING_TYPES.SPRITE]: {
        [LOD.LOW]: "#RomanSpriteLow",
        [LOD.MEDIUM]: "#RomanSpriteMedium",
        [LOD.HIGH]: "#RomanSpriteHigh"
    }
}

