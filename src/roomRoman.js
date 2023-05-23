/* This file adds a-entity's to the scene for the Roman Triumph. Only add
 * this file for this room. */

window.onload = function () {
    var parent = document.querySelector("a-scene");

    fetch('experiments/data/test0/parameters.json').then(
        (response) => response.json()).then(
            function (json) {
                for (let attrName of ["renderer", "path"]) {
                    let attrs = json[attrName];

                    for (let i = 0; i < attrs.length; i++) {
                        let attr = attrs[i];
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
        );

}
