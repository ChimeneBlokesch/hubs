// Server
// import low from "./assets/models/NPCs/low.glb"
// import medium from "./assets/models/NPCs/medium.glb"
// import high from "./assets/models/NPCs/high.glb"

// Local
var low = "./assets/models/NPCs/low.glb"
var medium = "./assets/models/NPCs/medium.glb"
var high = "./assets/models/NPCs/high.glb"

var roomVlooienburg = {
    "Test Ruimte Scriptie Mass Simulation Vlooienburg 1625": {
        "renderers":
        {
            "renderer1": {
                "renderingFiles": {
                    "sprite": null,
                    "low": low,
                    "medium": medium,
                    "high": high
                },
                "renderingAlgorithm": "algo_low",
                "distanceThresholds": [
                    15,
                    30,
                    500,
                    1000
                ],
                "capacity": 1000
            }
        },

        "paths":
        {
            "mid": {
                "beginLeft": "21.50 1 -14.50",
                "beginRight": "25.00 1 -19.50",
                "endLeft": "-51.50 1 -64.50",
                "endRight": "-47.50 1 -69.00",
                "amountNPCs": 100,
                "cellWidth": 1,
                "cellHeight": 1.5,
                "speedNPC": 5,
                "rotationNPC": 0,
                "idRenderer": "renderer1",
                "colorPlane": "red"
            },
            "left": {
                "beginLeft": "20.50 1 -13.50",
                "beginRight": "21.50 1 -14.50",
                "endLeft": "-52.00 1 -63.50",
                "endRight": "-51.50 1 -64.50",
                "amountNPCs": 50,
                "cellWidth": 1,
                "cellHeight": 0.6,
                "speedNPC": 0,
                "rotationNPC": -90,
                "idRenderer": "renderer1",
                "colorPlane": "blue"
            },
            "right": {
                "beginLeft": "25.00 1 -19.50",
                "beginRight": "25.50 1 -21.00",
                "endLeft": "-47.50 1 -69.00",
                "endRight": "-47.00 1 -70.00",
                "amountNPCs": 50,
                "cellWidth": 1,
                "cellHeight": 0.6,
                "speedNPC": 0,
                "rotationNPC": 90,
                "idRenderer": "renderer1",
                "colorPlane": "green"
            }
        }
    }
};

var roomTest = {
    "Minimal testing room": {
        "renderers":
        {
            "renderer1": {
                "renderingFiles": {
                    "sprite": null,
                    "low": low,
                    "medium": medium,
                    "high": high
                },
                "renderingAlgorithm": "algo_medium",
                "distanceThresholds": [
                    15,
                    30,
                    500,
                    1000
                ],
                "capacity": 1000
            }
        },
        "paths":
        {
            "mid": {
                "beginLeft": "-4 0 -6",
                "beginRight": "3 0 -6",
                "endLeft": "-4 0 -10000",
                "endRight": "3 0 -10000",
                "amountNPCs": 100,
                "cellWidth": 1,
                "cellHeight": 1,
                "speedNPC": 0.2,
                "rotationNPC": 0,
                "idRenderer": "renderer1",
                "colorPlane": "red"
            },
            "left": {
                "beginLeft": "-10 0 -6",
                "beginRight": "-5 0 -6",
                "endLeft": "-10 0 -10000",
                "endRight": "-5 0 -10000",
                "amountNPCs": 0,
                "cellWidth": 1,
                "cellHeight": 1,
                "speedNPC": 0,
                "rotationNPC": -90,
                "idRenderer": "renderer1",
                "colorPlane": "blue"
            },
            "right": {
                "beginLeft": "4 0 -6",
                "beginRight": "9 0 -6",
                "endLeft": "4 0 -10000",
                "endRight": "9 0 -10000",
                "amountNPCs": 0,
                "cellWidth": 1,
                "cellHeight": 1,
                "speedNPC": 0,
                "rotationNPC": 90,
                "idRenderer": "renderer1",
                "colorPlane": "green"
            }
        }
    }
};


export var rooms = { ...roomVlooienburg, ...roomTest };
