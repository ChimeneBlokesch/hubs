/* This file adds a-entity's to the scene for the Roman Triumph. Only add
 * this file for this room. */

var jsonParametersFile = "experiments/data/model_combi/standing/standing1/parameters.json"

window.onload = function () {
    fetch('src/base_parameters.json').then(
        (response) => response.json()).then(
            function (jsonBase) {
                if (jsonParametersFile != null) {
                    // Changes some values from the base file.
                    fetch(jsonParametersFile).then(
                        (response) => response.json()).then(
                            function (jsonParameters) {
                                // Recursively merge the two json file.
                                // Override the
                                // given values in the base file by the
                                // values of the parameters file.
                                jsonFull = $.extend(true, jsonBase, jsonParameters);
                                jsonToElements(jsonFull);
                            }
                        );

                    return;
                }

                // Only use base file.
                jsonToElements(jsonBase);
            }
        );
}

function jsonToElements(json) {
    var parent = document.querySelector("a-scene");

    for (let attrName of ["renderer", "path"]) {
        let attrs = json[attrName];

        for (let attr of attrs) {
            let el = document.createElement("a-entity");
            el.setAttribute("id", attr.id);

            var properties = attr.properties;

            if ("rotationNPC" in properties) {
                // Convert degrees to radians.
                properties["rotationNPC"] *= Math.PI / 180;
            }

            el.setAttribute(attrName, properties);

            parent.appendChild(el);
        }
    }
}
