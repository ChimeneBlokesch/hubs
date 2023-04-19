var AMOUNT_NPCS = 10


var START_CELL_NUM = 0
var AMOUNT_NPCS_PER_ROW = 3



// TODO: how to find these?
// The range of the x- and y-coordinates in the room.
const MIN_X = 0;
const MIN_Z = 0;
const MAX_X = 5;
const MAX_Z = 5;


const WIDTH = MAX_X - MIN_X;
const HEIGHT = MAX_Z - MIN_Z;

const AMOUNT_COLS = Math.ceil(WIDTH / CELL_SIZE);
// const AMOUNT_ROWS = Math.ceil(HEIGHT / CELL_SIZE);

/* Generates the NPC objects and adds them to the scene. */
function initializeNPCs() {
    var npcs = []
    var parent = document.querySelector("a-scene");
    var start = new THREE.Vector3();
    start.x = MIN_X + CELL_SIZE / 2;
    start.z = MIN_Z + CELL_SIZE / 2;

    for (var i = 0; i < AMOUNT_NPCS; i++) {
        var el = document.createElement("a-entity");
        el.setAttribute("npc", "");
        el.setAttribute("networked", "");
        parent.appendChild(el);
        npcs.push(el);
    }

    return npcs;
}
