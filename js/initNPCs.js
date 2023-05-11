/* Generates the NPC objects and adds them to the scene. */
function initializeNPCs(idPaths, idRenderer) {
    var curPos = new THREE.Vector3();

    for (var idPath of idPaths) {
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
