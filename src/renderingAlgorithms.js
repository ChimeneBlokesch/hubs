// Different algorithms for rendering.
export const RENDERING_ALGORITHMS = {
    // All models are shown as 3D models with low LOD.
    ALGO_LOW: "algo_low",
    // All models are shown as 3D models with medium LOD.
    ALGO_MEDIUM: "algo_medium",
    // All models are shown as 3D models with high LOD.
    ALGO_HIGH: "algo_high",
    // Combines the three LODs, depending on the distance to
    // the avatar of the user.
    ALGO_COMBI: "algo_combi",
    // // All models are shown as 2D sprites.
    // ALGO_SPRITE: "algo_sprite",
    // // Combines the sprite and the three LODs, depending on the distance to
    // // the avatar of the user.
    // MODEL_COMBI_SPRITE: "algo_combi_sprite",
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
    // [RENDERING_ALGORITHMS.ALGO_SPRITE]: LOD.SPRITE,
    [RENDERING_ALGORITHMS.ALGO_LOW]: LOD.LOW,
    [RENDERING_ALGORITHMS.ALGO_MEDIUM]: LOD.MEDIUM,
    [RENDERING_ALGORITHMS.ALGO_HIGH]: LOD.HIGH
}

export function algo2lods(algo) {
    switch (algo) {
        case RENDERING_ALGORITHMS.ALGO_LOW:
            return [LOD.LOW];

        case RENDERING_ALGORITHMS.ALGO_MEDIUM:
            return [LOD.MEDIUM];

        case RENDERING_ALGORITHMS.ALGO_HIGH:
            return [LOD.HIGH];

        case RENDERING_ALGORITHMS.ALGO_COMBI:
            return [LOD.HIGH, LOD.MEDIUM, LOD.LOW];

        // case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
        //     return [LOD.HIGH, LOD.MEDIUM, LOD.LOW, LOD.SPRITE];
        default:
            console.warn("Unknown rendering algorithm: " + algo);
            return [];
    }
}
