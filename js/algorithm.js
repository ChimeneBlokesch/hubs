
// The probability a NPC will walk to the forward cell.
const PROB_FORWARD = 1;

// The probability a NPC will walk to the left or right diagonal forward cell.
const PROB_FORWARD_DIAG = 0.15;

// // The probability a NPC will walk to the cell behind the NPC.
// const PROB_TURN_AROUND = 0.2;

// // The probability of two NPCs (still) talking to each other. This could happen
// // when the other NPC is one cell further away and when they are faced to each
// // other.
// const PROB_TALK = 0.1;

const RENDERING_TYPES = {
    MODEL: 0,
    SPRITE: 1,
    COMBI: 2
}

const RENDERING_TYPE = RENDERING_TYPES.SPRITE;
const RENDERING_DISTANCE = 50;

/* Sets the new position of the target and new rotation of the
 * based on the decision of the next move. */
function nextMove(target, position, rotation) {
    // var curCellNum = getCellNum(position.x, position.z);

    // The cell number of the next target relative to the current cell.
    var direction = null;

    if (Math.random() < PROB_FORWARD) {
        // Choose the forward cell.
        direction = DIRECTION.FORWARD;
    } else if (Math.random() < PROB_FORWARD_DIAG) {
        // Choose the left diagonal forward cell.
        direction = DIRECTION.LEFT_FORWARD;

        if (Math.random() < 0.5) {
            // Choose the right diagonal forward cell.
            direction = DIRECTION.RIGHT_FORWARD;
        }
    }

    if (direction) {
        var xz = nextDirection(position.x, position.z, rotation.y, direction);
        // var xy = getMidCell(getNeighbourCellNum(curCellNum, newCell, rotation));
        target.x = xz[0];
        target.z = xz[1];
        rotation.y += xz[2];
    }
}
