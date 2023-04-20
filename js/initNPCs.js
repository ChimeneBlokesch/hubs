/* Returns the next center. If the width is full, return the center of the cell
 * at the beginning of the next row.  */
function nextPosition(curPosX, curPosZ) {
    switch (ROOM.widthAxis) {
        case 'x':
            if (curPosX + ROOM.cellSize > ROOM.maxX) {
                // Go to the beginning of the next row.
                return [ROOM.minX + ROOM.cellSize / 2, curPosZ + ROOM.cellSize];
            }

            curPosX += ROOM.cellSize;
            break;
        case 'z':
            if (curPosZ + ROOM.cellSize > ROOM.maxZ) {
                // Go to the beginning of the next row.
                return [curPosX + ROOM.cellSize, ROOM.minZ + ROOM.cellSize / 2];
            }

            curPosZ += ROOM.cellSize;
            break;
        default:
            break;
    }

    return [curPosX, curPosZ];
}


/* Generates the NPC objects and adds them to the scene. */
function initializeNPCs() {
    var npcs = []
    var parent = document.querySelector("a-scene");
    curPosX = ROOM.minX + ROOM.cellSize / 2;
    curPosZ = ROOM.minZ + ROOM.cellSize / 2;

    for (var i = 0; i < ROOM.amountNPCs; i++) {
        var el = document.createElement("a-entity");
        el.setAttribute("npc", "");
        el.setAttribute("networked", "");
        parent.appendChild(el);
        npcs.push(el);

        // Set the position of the NPC.
        el.object3D.position.x = curPosX;
        el.object3D.position.z = curPosZ;

        // Calculate the position of the next NPC.
        [curPosX, curPosZ] = nextPosition(curPosX, curPosZ);
    }

    return npcs;
}
