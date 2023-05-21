/* This file adds a-entity's to the scene for the Roman Triumph. Only add
 * this file for this room. */

window.onload = function () {

    var attributes =
    {
        "renderer": [{
            "id": "renderer",
            "properties": {
                "renderingFiles": {
                    "sprite": "models/sprite/spriteNPC.png",
                    "low": "models/cheering2.glb",
                    "medium": "models/cheering2.glb",
                    "high": "models/cheering2.glb"
                },
                "renderingAlgo": "model_low",
                "distanceThresholds": [2, 5, 10, 1000]
            }
        }
        ],

        "path": [{
            "id": "mid",
            "properties": {
                "minX": -4,
                "maxX": 6,
                "minZ": -50,
                "maxZ": 50,
                "amountNPCs": 500,
                "cellSizeX": 2,
                "cellSizeZ": 2,
                "speedNPC": 0.2,
                "rotationNPC": Math.PI,
                "idRenderer": "renderer",
                "walkReversed": true
            }
        },
        {
            "id": "left",
            "properties": {
                "minX": -6,
                "maxX": -3,
                "minZ": -50,
                "maxZ": 50,
                "amountNPCs": 500,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0,
                "rotationNPC": Math.PI / 2,
                "idRenderer": "renderer"
            }
        },
        {
            "id": "right",
            "properties": {
                "minX": 3,
                "maxX": 7,
                "minZ": -50,
                "maxZ": 50,
                "amountNPCs": 500,
                "cellSizeX": 1,
                "cellSizeZ": 1.5,
                "speedNPC": 0,
                "rotationNPC": -Math.PI / 2,
                "idRenderer": "renderer"
            }
        }
        ]
    };

    var parent = document.querySelector("a-scene");

    for (let attrName of ["renderer", "path"]) {
        let attrs = attributes[attrName];

        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i];
            let el = document.createElement("a-entity");
            el.setAttribute("id", attr.id);
            el.setAttribute(attrName, attr.properties);
            parent.appendChild(el);
        }
    }
}
