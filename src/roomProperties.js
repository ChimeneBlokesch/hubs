// Server
import low from "./assets/models/NPCs/low.glb"
import medium from "./assets/models/NPCs/medium.glb"
import high from "./assets/models/NPCs/high.glb"

// Local
// var low = "./assets/models/NPCs/low.glb"
// var medium = "./assets/models/NPCs/medium.glb"
// var high = "./assets/models/NPCs/high.glb"

var roomVlooienburg = {
    // Unique room title, must match with room name in Mozilla Hubs.
    "Test Ruimte Scriptie Mass Simulation Vlooienburg 1625": {
        // The list of different renders.
        "renderers":
        {
            // Unique name of renderer.
            "renderer1": {
                // The used files per quality.
                "renderingFiles": {
                    "sprite": null,
                    "low": low,
                    "medium": medium,
                    "high": high
                },
                // One of the defined rendering algorithms.
                "renderingAlgorithm": "algo_low",
                // List of values from low to high corresponding
                // to the used qualities. Depends on renderingAlgorithm if
                // it should be used.
                "distanceThresholds": [
                    15,
                    30,
                    500,
                    1000
                ],
                // The capacity used by Instanced-Mesh for each model.
                "capacity": 1000
            }
        },

        "paths":
        {
            "mid": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "21.50 1 -14.50",
                // The right corner of the start of the path.
                "beginRight": "25.00 1 -19.50",
                // The left corner of the ending of the path.
                "endLeft": "-51.50 1 -64.50",
                // The right corner of the ending of the path.
                "endRight": "-47.50 1 -69.00",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 100,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 1.5,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0.2,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": 0,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "red"
            },
            "left": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "20.50 1 -13.50",
                // The right corner of the start of the path.
                "beginRight": "21.50 1 -14.50",
                // The left corner of the ending of the path.
                "endLeft": "-52.00 1 -63.50",
                // The right corner of the ending of the path.
                "endRight": "-51.50 1 -64.50",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 50,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 0.6,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": -90,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "blue"
            },
            "right": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "25.00 1 -19.50",
                // The right corner of the start of the path.
                "beginRight": "25.50 1 -21.00",
                // The left corner of the ending of the path.
                "endLeft": "-47.50 1 -69.00",
                // The right corner of the ending of the path.
                "endRight": "-47.00 1 -70.00",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 50,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 0.6,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": 90,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "green"
            }
        }
    }
};

var roomTest = {
    // Unique room title, must match with room name in Mozilla Hubs.
    "Minimal testing room": {
        // The list of different renders.
        "renderers":
        {
            // Unique name of renderer.
            "renderer1": {
                // The used files per quality.
                "renderingFiles": {
                    "sprite": null,
                    "low": low,
                    "medium": medium,
                    "high": high
                },
                // One of the defined rendering algorithms.
                "renderingAlgorithm": "algo_medium",
                // List of values from low to high corresponding
                // to the used qualities. Depends on renderingAlgorithm if
                // it should be used.
                "distanceThresholds": [
                    15,
                    30,
                    500,
                    10000
                ],
                // The capacity used by Instanced-Mesh for each model.
                "capacity": 1000
            }
        },
        // The list of different paths.
        "paths":
        {
            // Unique name of path.
            "mid": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "-4 0 -6",
                // The right corner of the start of the path.
                "beginRight": "3 0 -6",
                // The left corner of the ending of the path.
                "endLeft": "-4 0 -10000",
                // The right corner of the ending of the path.
                "endRight": "3 0 -10000",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 100,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 1,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0.2,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": 0,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "red"
            },
            "left": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "-10 0 -6",
                // The right corner of the start of the path.
                "beginRight": "-5 0 -6",
                // The left corner of the ending of the path.
                "endLeft": "-10 0 -10000",
                // The right corner of the ending of the path.
                "endRight": "-5 0 -10000",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 0,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 1,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": -90,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "blue"
            },
            "right": {
                // Format: 'x y z' with y being the height.
                // The left corner of the start of the path.
                "beginLeft": "4 0 -6",
                // The right corner of the start of the path.
                "beginRight": "9 0 -6",
                // The left corner of the ending of the path.
                "endLeft": "4 0 -10000",
                // The right corner of the ending of the path.
                "endRight": "9 0 -10000",
                // The amount of NPCs on the path. It still reaches this
                // amount even if the path is too small by exceeding the end
                // of the path.
                "amountNPCs": 0,
                // Difference between NPCs in the width of the path.
                "cellWidth": 1,
                // Difference between NPCs in the height of the path.
                "cellHeight": 1,
                // The same speed is used for all NPCs on this path.
                "speedNPC": 0,
                // The same rotation is used for all NPCs on this path.
                // The angle in degrees, 0 means looking to the end of the path.
                // -90 means looking to the right and 90 means to the left.
                "rotationNPC": 90,
                // Name of the renderer to be used for this path.
                "idRenderer": "renderer1",
                // Color of a plane to visualize the plane. If the value is ''
                // or it's not given, no plane is shown. Used for debugging.
                "colorPlane": "green"
            }
        }
    }
};


export var rooms = { ...roomVlooienburg, ...roomTest };
