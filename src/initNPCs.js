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
    var properties = rooms[getSceneName()];

    if (properties == null) {
        return;
    }

    if (experimentVariables != null) {
        // Start the test with the next parameters.
        var init = Object.keys(experimentVariables).length == 0;

        if (init) {
            // Initialize variables.
            experimentVariables["parameters"] = properties;
            experimentVariables["rendering"] = {};
            experimentVariables["rendering"]["algos"] = Object.values(RENDERING_ALGORITHMS);
            experimentVariables["rendering"]["curAlgo"] = experimentVariables["rendering"]["algos"][0];
            experimentVariables["amountList"] = [1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
            experimentVariables["path"] = { "walking": [], "standing": [], "totalAmountNPCs": 1, "isMoving": "standing" };

            for (var path of Object.values(properties["paths"])) {
                var isMoving = path.speedNPC == 0 ? "standing" : "walking";
                experimentVariables["path"][isMoving].push(path);
            }
        }

        nextParameters(init);
        properties = experimentVariables["parameters"];

        var scene = document.querySelector("a-scene");
        var func = "restartMassSimulation";
        var filename = experimentVariables["rendering"]["curAlgo"] + "_" + experimentVariables["path"]["isMoving"] + "_" + experimentVariables["path"]["totalAmountNPCs"] + ".json";
        window[func] = function () { removeMassSimulation(); enableMassSimulation(); };
        scene.removeAttribute("stats-file");
        scene.setAttribute("stats-file", { "start": 3, "seconds": 10, "onstop": func, "downloadfilename": filename });
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
        var pathProperties = { ...path };

        if ("rotationNPC" in path) {
            // Convert degrees to radians.
            pathProperties["rotationNPC"] *= Math.PI / 180;
        }

        el.setAttribute("path", pathProperties);
        parent.appendChild(el);
    }
}

/* Remove all elements for the mass simulation. */
function removeMassSimulation() {
    for (var name of ["path", "renderer"]) {
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

/* Returns a list with two elements. The first value is the boolean
 * to know if the first index is taken. The second value is the next value in
 * the list. */
function nextValueInList(arr, old) {
    var idx = arr.indexOf(old);
    idx += 1;
    idx %= arr.length;
    return [idx == 0, arr[idx]];
}

/* Splits the amount of NPCs between the given paths. */
function changeAmountNPCs(amount, paths) {
    var amountPerPath = Math.floor(amount / paths.length);
    var remainder = amount - paths.length * amountPerPath;

    for (var [i, path] of paths.entries()) {
        var extra = i < remainder ? 1 : 0;
        path["amountNPCs"] = amountPerPath + extra;
    }
}

/* Set the given algorithm for every renderer in the list. */
function setRenderingAlgorithm(renderers, algo) {
    for (var renderer of Object.values(renderers)) {
        // Next rendering algorithm.
        renderer["renderingAlgorithm"] = algo;
    }
}

/* Set the parameters to the next value. If 'init' is true, all parameters are
 * set using the current values in 'experimentVariables'. */
function nextParameters(init) {
    var params = experimentVariables["parameters"];
    var curIsMoving = experimentVariables["path"]["isMoving"];
    var otherIsMoving = curIsMoving == "walking" ? "standing" : "walking";

    if (init) {
        // Set amount of NPCs per path;
        changeAmountNPCs(experimentVariables["path"]["totalAmountNPCs"], experimentVariables["path"][curIsMoving]);
        changeAmountNPCs(0, experimentVariables["path"][otherIsMoving]);

        // Set rendering algorithm per renderer.
        var renderingAlgorithm = experimentVariables["rendering"]["curAlgo"];
        setRenderingAlgorithm(params["renderers"], renderingAlgorithm);
        return;
    }

    var [doneAmount, newAmount] = nextValueInList(experimentVariables["amountList"], experimentVariables["path"]["totalAmountNPCs"]);
    experimentVariables["path"]["totalAmountNPCs"] = newAmount;
    changeAmountNPCs(experimentVariables["path"]["totalAmountNPCs"], experimentVariables["path"][curIsMoving]);

    // Check if the last amount has not been tested.
    if (!doneAmount) {
        // Only the amount should be changed.
        return;
    }

    // Switch also rendering algorithm.
    var oldAlgo = experimentVariables["rendering"]["curAlgo"];
    var [doneAlgo, nextAlgo] = nextValueInList(experimentVariables["rendering"]["algos"], oldAlgo);
    experimentVariables["rendering"]["curAlgo"] = nextAlgo;

    setRenderingAlgorithm(params["renderers"], nextAlgo);

    if (!doneAlgo) {
        // Only the amount and the rendering algorithm should be changed.
        return;
    }

    // Toggle between 'standing' and 'moving' paths.
    experimentVariables["path"]["isMoving"] = otherIsMoving;
    changeAmountNPCs(experimentVariables["path"]["totalAmountNPCs"], experimentVariables["path"][otherIsMoving]);
    changeAmountNPCs(0, experimentVariables["path"][curIsMoving]);
}
