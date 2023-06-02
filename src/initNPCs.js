import "components/stats-file";
import "components/moving-forward";
import "components/path";
import "components/rendered-object";
import "components/renderer";

var parametersFolder = "src/parameters/NPCs/";

/* Enable mass simulation if there is a parameters json file corresponding
 * with the scene title. */
window.onload = function () {
    var jsonParametersFile = parametersFolder + getSceneName() + ".json";

    // Changes some values from the base file.
    fetch(jsonParametersFile).then(
        (response) => response.json()).then(
            function (jsonParameters) {
                jsonToElements(jsonParameters);
            }
        );
};


/* Returns the name of the room in Mozilla Hubs. */
function getSceneName() {
    var metas = document.querySelectorAll("[properties]");

    for (let meta in metas) {
        if (meta.attributes.property.value != "og:title") {
            continue;
        }


        // Found title meta tag. Extract name.
        return meta.attributes.content.value.split("|")[0].trim();
    }
}

/* Create a-entity's using the parameters given in the json and
 * appends it to the scene. */
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

