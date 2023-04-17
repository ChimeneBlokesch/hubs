var AMOUNT_NPCS = 10


var START_CELL_NUM = 0
var AMOUNT_NPCS_PER_ROW = 3

// TODO: update to correct filename
NPC_MODEL_FILE = "/models/a.gltf"


// TODO: how to find these?
// The range of the x- and y-coordinates in the room.
const MIN_X = 0;
const MIN_Y = 0;
const MAX_X = 5;
const MAX_Y = 5;


const WIDTH = MAX_X - MIN_X;
// const HEIGHT = MAX_Y - MIN_Y;

const AMOUNT_COLS = Math.ceil(WIDTH / CELL_SIZE);
// const AMOUNT_ROWS = Math.ceil(HEIGHT / CELL_SIZE);





AFRAME.registerComponent('NPC', {
    schema: {
        path: { type: 'string', default: null },
        speed: { type: 'number', default: 0.1 }
    },
    init: function () {
        this.model = null;
        this.target = this.el.object3D.position.copy();
        this.directionVec3 = new THREE.Vector3();

        if (this.data.url) {
            this.el.setObject3D('NPC_Object', this.data.path);
        }
    },

    tick: function (time) {
        nextMove(this.data.target, this.el.object3D.position, this.el.object3D.rotation);
        forward(this.el, this.data.target, this.directionVec3);
    }
});

function initializeNPCs() {
    var npcs = []
    var scene = document.querySelector("a-scene");

    for (var i = 0; i < AMOUNT_NPCS; i++) {
        var el = document.createElement("a-entity");
        el.setAttribute("NPC", "path:" + NPC_MODEL_FILE);
        scene.appendChild(el);
        npcs.push();
    }

    return npcs;
}
