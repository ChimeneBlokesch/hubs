// Different algorithms for rendering.
export const RENDERING_ALGORITHMS = {
    // All models are shown as 3D models with low LOD.
    MODEL_LOW: "model_low",
    // All models are shown as 3D models with medium LOD.
    MODEL_MEDIUM: "model_medium",
    // All models are shown as 3D models with high LOD.
    MODEL_HIGH: "model_high",
    // Combines the three LODs, depending on the distance to
    // the avatar of the user.
    MODEL_COMBI: "model_combi",
    // All models are shown as 2D sprites.
    SPRITE: "model_sprite",
    // Combines the sprite and the three LODs, depending on the distance to
    // the avatar of the user.
    MODEL_COMBI_SPRITE: "model_combi_sprite",
}

// Level of detail
export const LOD = {
    SPRITE: "sprite",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
}

// One-to-one mapping from rendering algorithm to LOD.
export const ALGO2LOD = {
    [RENDERING_ALGORITHMS.SPRITE]: LOD.SPRITE,
    [RENDERING_ALGORITHMS.MODEL_LOW]: LOD.LOW,
    [RENDERING_ALGORITHMS.MODEL_MEDIUM]: LOD.MEDIUM,
    [RENDERING_ALGORITHMS.MODEL_HIGH]: LOD.HIGH
}

export function algo2lods(algo) {
    switch (algo) {
        case RENDERING_ALGORITHMS.MODEL_LOW:
            return [LOD.LOW];

        case RENDERING_ALGORITHMS.MODEL_MEDIUM:
            return [LOD.MEDIUM];

        case RENDERING_ALGORITHMS.MODEL_HIGH:
            return [LOD.HIGH];

        case RENDERING_ALGORITHMS.MODEL_COMBI:
            return [LOD.HIGH, LOD.MEDIUM, LOD.LOW];

        case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
            return [LOD.HIGH, LOD.MEDIUM, LOD.LOW, LOD.SPRITE];
    }
}
