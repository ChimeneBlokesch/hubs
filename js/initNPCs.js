/* Generates the NPC objects and adds them to the scene. */
function initializeNPCs() {
    var npcs = []
    var parent = document.querySelector("a-scene");
    var curPos = new THREE.Vector3();

    for (var i = 0; i < ROOM.paths.length; i++) {
        var path = ROOM.paths[i];
        path.setStartPosition(curPos);

        for (var j = 0; j < path.amountNPCs; j++) {
            var el = document.createElement("a-entity");
            el.setAttribute("npc", "speed:" + path.speedNPC + ";pathIndex:" + i + ";");
            el.setAttribute("networked", "");
            el.object3D.rotation.y = path.rotationNPC;
            parent.appendChild(el);
            npcs.push(el);

            // Calculate the position of the next NPC.
            path.initNextPosition(curPos);

            // Set the position of the NPC.
            el.object3D.position.set(curPos.x, curPos.y, curPos.z);
        }
    }

    return npcs;
}
