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
                "minX": -5,
                "maxX": 5,
                "minZ": -100,
                "maxZ": 100,
                "amountNPCs": 300,
                "cellSizeX": 2,
                "cellSizeZ": 5,
                "speedNPC": 0.2,
                "rotationNPC": 0,
                "idRenderer": "renderer"
            }
        },
        {
            "id": "left",
            "properties": {
                "minX": -7,
                "maxX": -5,
                "minZ": -50,
                "maxZ": 50,
                "amountNPCs": 200,
                "cellSizeX": 1,
                "cellSizeZ": 2,
                "speedNPC": 0,
                "rotationNPC": Math.PI / 2,
                "idRenderer": "renderer"
            }
        },
        {
            "id": "right",
            "properties": {
                "minX": 5,
                "maxX": 7,
                "minZ": -50,
                "maxZ": 50,
                "amountNPCs": 200,
                "cellSizeX": 1,
                "cellSizeZ": 2,
                "speedNPC": 0,
                "rotationNPC": -Math.PI / 2,
                "idRenderer": "renderer"
            }
        }]
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
