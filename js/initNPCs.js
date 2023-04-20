var AMOUNT_NPCS = 10

// TODO: how to find these?
// The range of the x- and y-coordinates in the room.
const MIN_X = 0;
const MIN_Z = 0;
const MAX_X = 5;
const MAX_Z = 6;

const LENGTH_X = MAX_X - MIN_X;
const LENGTH_Z = MAX_Z - MIN_Z;

// The width axis has the smallest range.
var widthAxis = LENGTH_X < LENGTH_Z ? 'x' : 'z';


/* Returns the next center. If the width is full, return the center of the cell
 * at the beginning of the next row.  */
function nextPosition(curPosX, curPosZ) {
    switch (widthAxis) {
        case 'x':
            if (curPosX + CELL_SIZE > MAX_X) {
                // Go to the beginning of the next row.
                return [MIN_X + CELL_SIZE / 2, curPosZ + CELL_SIZE];
            }

            curPosX += CELL_SIZE;
            break;
        case 'z':
            if (curPosZ + CELL_SIZE > MAX_Z) {
                // Go to the beginning of the next row.
                return [curPosX + CELL_SIZE, MIN_Z + CELL_SIZE / 2];
            }

            curPosZ += CELL_SIZE;
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
    curPosX = MIN_X + CELL_SIZE / 2;
    curPosZ = MIN_Z + CELL_SIZE / 2;

    for (var i = 0; i < AMOUNT_NPCS; i++) {
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
