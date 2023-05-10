/* Generates the NPC objects and adds them to the scene. */
function initializeNPCs(idPaths, idRenderer) {
    var curPos = new THREE.Vector3();
    var root = document.querySelector("a-scene");

    for (var idPath of idPaths) {
        console.log("idPath: " + idPath);
        var pathEl = document.querySelector("#" + idPath);
        console.log("pathEl: ");
        console.log(pathEl);
        var pathComponent = pathEl.components.path;
        console.log("pathComponent: ");
        console.log(pathComponent);
        var pathData = pathEl.getDOMAttribute("path");
        console.log("pathData: ");
        console.log(pathData);

        pathComponent.setStartPosition(curPos);

        for (var j = 0; j < pathData.amountNPCs; j++) {
            var el = document.createElement("a-entity");

            if (pathData.speedNPC != 0) {
                el.setAttribute("moving-forward", {
                    "pathEl": pathEl
                });
            }

            el.setAttribute("rendering-type", { "renderer": "#" + idRenderer });

            el.setAttribute("networked", "");

            el.object3D.rotation.y = pathData.rotationNPC;

            root.appendChild(el);

            // Set the position of the NPC.
            el.object3D.position.set(curPos.x, curPos.y, curPos.z);

            // Calculate the position of the next NPC.
            pathComponent.initNextPosition(curPos);
        }

        if (pathData.speedNPC == 0) {
            // Path object is not needed anymore.
            delete idPaths[idPath];
        }
    }
}
