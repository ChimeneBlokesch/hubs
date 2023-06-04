// Server
// import "./components/stats-file";
// import "./components/moving-forward";
// import "./components/path";
// import "./components/rendered-object";
// import "./components/renderer";

// import { rooms } from "./roomProperties"
// import { RENDERING_ALGORITHMS } from "./renderingAlgorithms";


// Local
import "./components/stats-file.js";
import "./components/moving-forward.js";
import "./components/path.js";
import "./components/rendered-object.js";
import "./components/renderer.js";

import { rooms } from "./roomProperties.js"
import { RENDERING_ALGORITHMS } from "./renderingAlgorithms.js";

var experimentVariables = null;

/* Enable mass simulation if there are room properties corresponding
 * with the scene title. */
function enableMassSimulation() {
    console.log("Checking for room properties.")
    var properties = rooms[getSceneName()];

    if (properties == null) {
        return;
    }

    console.log("Worked! Mass simulation is going to be added to this room.");
    console.log(properties);

    if (experimentVariables != null) {
        // Start the test with the next parameters.
        if (Object.keys(experimentVariables).length == 0) {
            // Initialize variables.
            experimentVariables = {};
            experimentVariables["parameters"] = properties;
            experimentVariables["renderingAlgorithms"] = Object.entries(RENDERING_ALGORITHMS);
            experimentVariables["amounts"] = [1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
            experimentVariables["path"] = { "walking": [], "standing": [], "totalAmountNPCs": 1, "moving": "standing" };

            for (var path of Object.values(properties["paths"])) {
                var moving = path.speed == 0 ? "standing" : "walking";
                experimentVariables[moving].push(path);

            }
        }

        nextParameters();

        var scene = document.querySelector("a-scene");
        var func = "restartMassSimulation";
        var filename = experimentVariables["parameters"]["renderers"][0]["renderingAlgorithm"] + "_" + experimentVariables["path"]["moving"] + "_" + experimentVariables["path"]["totalAmountNPCs"] + ".json";
        scene.addAttribute("stats-file", { "seconds": 10, "onremove": func, "downloadfilename": filename });
        window["func"] = function () { removeMassSimulation(); enableMassSimulation(); };
    }

    jsonToElements(properties);
}

// Always enable mass simulation onload.
window.onload = enableMassSimulation;

/* Returns the name of the room in Mozilla Hubs. */
function getSceneName() {
    var metas = document.querySelectorAll("[property]");

    for (let meta of metas) {
        if (meta.attributes.property.value != "og:title") {
            continue;
        }

        // Found title meta tag. Extract name.
        var name = meta.attributes.content.value.split("|")[0].trim();

        if (name.toLowerCase().includes("test")) {
            // Enable debug mode in testing rooms.
            enableExperimentMode();
        }

        return name;
    }
}

/* Create a-entity's using the parameters given in the json and
 * appends it to the scene. */
function jsonToElements(json) {
    var parent = document.querySelector("a-scene");

    for (let [rendererName, renderer] of Object.entries(json["renderers"])) {
        let el = document.createElement("a-entity");
        el.setAttribute("id", rendererName);
        el.setAttribute("renderer", renderer);
        parent.appendChild(el);
    }

    for (let [pathName, path] of Object.entries(json["paths"])) {
        let el = document.createElement("a-entity");
        el.setAttribute("id", pathName);

        if ("rotationNPC" in path) {
            // Convert degrees to radians.
            path["rotationNPC"] *= Math.PI / 180;
        }

        el.setAttribute("path", path);

        parent.appendChild(el);
    }
}

function removeMassSimulation() {
    // Remove all elements for the mass simulation.
    for (var name of ["renderer", "path"]) {
        for (var el of document.querySelectorAll("[" + name + "]")) {
            el.remove();
        }
    }
}

/* In experiment mode, the stats are shown and after a test the mass
 * simulation component is restarted with the next parameters. */
function enableExperimentMode() {
    // Add a global function to restart the mass simulation component.
    if (experimentVariables == null) {
        experimentVariables = {};
    }
}

function nextValueInList(arr, old) {
    var idx = arr.indexOf(old);
    idx += 1;

    if (idx == arr.length()) {
        return arr[0];
    }

    return arr[idx];
}

function changeAmountNPCs(amount, paths) {
    var amountPerPath = amount / paths.length;

    for (var path of paths) {
        path["amountNPCs"] = amountPerPath;
    }
}

function nextParameters() {
    var params = experimentVariables["parameters"];

    // Check if the last amount has been tested.
    if (experimentVariables["path"]["totalAmountNPCs"] == experimentVariables["amount"].slice(-1)) {
        // Go back to first amount.
        experimentVariables["path"]["totalAmountNPCs"] = experimentVariables["amount"][0];

        var oldMoving = experimentVariables["path"]["moving"];
        var newMoving = oldMoving == "walking" ? "standing" : "walking";
        experimentVariables["path"]["isMoving"] = newMoving;
        changeAmountNPCs(experimentVariables["path"]["totalAmountNPCs"], experimentVariables["path"][newMoving]);
        changeAmountNPCs(0, experimentVariables["path"][oldMoving]);

        if (experimentVariables["path"]["isMoving"] == "standing") {
            // Only switch amount and isMoving.
            return;
        }

        // Switch also rendering algorithm.

        for (var renderer of params["renderer"]) {
            // Next rendering algorithm.
            renderer["properties"]["renderingAlgorithm"] = nextValueInList(renderer["properties"]["renderingAlgorithm"]);
        }

        return;
    }

    // Only the amount should be changed.
    experimentVariables["path"]["amountNPCs"] = nextValueInList(experimentVariables["amounts"], experimentVariables["path"]["amountNPCs"]);
}
