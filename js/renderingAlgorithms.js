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
