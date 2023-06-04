import low from "./assets/models/NPCs/low.glb"
import medium from "./assets/models/NPCs/medium.glb"
import high from "./assets/models/NPCs/high.glb"

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
                "minX": 21.50,
                "maxX": 23,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 100,
                "cellSizeX": 2,
                "cellSizeZ": 2,
                "speedNPC": 0.2,
                "rotationNPC": 180,
                "idRenderer": "renderer1",
                "walkReversed": true
            },
            "left": {
                "minX": 21,
                "maxX": 21.50,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0,
                "rotationNPC": 90,
                "idRenderer": "renderer1",
                "walkReversed": true
            },
            "right": {
                "minX": 24.50,
                "maxX": 25,
                "minZ": -67.50,
                "maxZ": -13.50,
                "amountNPCs": 50,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0,
                "rotationNPC": -90,
                "idRenderer": "renderer1",
                "walkReversed": true
            }
        }
    }
};


export var rooms = { ...roomVlooienburg };
