// Server
// import low from "./assets/models/NPCs/low.glb"
// import medium from "./assets/models/NPCs/medium.glb"
// import high from "./assets/models/NPCs/high.glb"

// Local
var low = "./assets/models/NPCs/low.glb"
var medium = "./assets/models/NPCs/medium.glb"
var high = "./assets/models/NPCs/high.glb"

var roomVlooienburg = {
    "Vlooienburg 1625": {
        "renderers":
        {
            "renderer1": {
                "renderingFiles": {
                    "sprite": null,
                    "low": low,
                    "medium": medium,
                    "high": high
                },
                "renderingAlgo": "model_low",
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
                "minX": 22,
                "maxX": 25,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 100,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0.2,
                "rotationNPC": 180,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "red"
            },
            "left": {
                "minX": 20.50,
                "maxX": 22,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 0.6,
                "speedNPC": 0,
                "rotationNPC": 90,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "blue"
            },
            "right": {
                "minX": 25,
                "maxX": 26.50,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 0.6,
                "speedNPC": 0,
                "rotationNPC": -90,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "green"
            }
        }
    }
};

var roomTest = {
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
                "renderingAlgo": "model_low",
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
                "minX": -4,
                "maxX": 3,
                "minZ": -500,
                "maxZ": 0,
                "amountNPCs": 100,
                "cellSizeX": 2,
                "cellSizeZ": 1.5,
                "speedNPC": 0.2,
                "rotationNPC": 180,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "red"
            },
            "left": {
                "minX": -10,
                "maxX": -5,
                "minZ": -500,
                "maxZ": -2,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 2,
                "speedNPC": 0,
                "rotationNPC": 90,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "blue"
            },
            "right": {
                "minX": 4,
                "maxX": 9,
                "minZ": -500,
                "maxZ": -2,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0,
                "rotationNPC": -90,
                "idRenderer": "renderer1",
                "walkReversed": true,
                "colorPlane": "green"
            }
        }
    }
};

export var rooms = { ...roomVlooienburg, ...roomTest };
