
// The probability a NPC will walk to the forward cell.
const PROB_FORWARD = 0.8;

// The probability a NPC will walk to the left or right diagonal forward cell.
const PROB_FORWARD_DIAG = 0.15;

// // The probability a NPC will walk to the cell behind the NPC.
// const PROB_TURN_AROUND = 0.2;

// // The probability of two NPCs (still) talking to each other. This could happen
// // when the other NPC is one cell further away and when they are faced to each
// // other.
// const PROB_TALK = 0.1;




/* Sets the new position of the target based on the decision of the next move. */
function nextMove(target, position, rotation) {
    var curCellNum = getCellNum(position.x, position.y);

    // The cell number of the next target relative to the current cell.
    var newCell = null;

    if (Math.random() < PROB_FORWARD) {
        // Choose the forward cell.
        newCell = MID_ABOVE;
    }

    if (Math.random() < PROB_FORWARD_DIAG) {
        // Choose the left diagonal forward cell.
        newCell = LEFT_ABOVE;

        if (Math.random() < 0.5) {
            // Choose the right diagonal forward cell.
            newCell = RIGHT_ABOVE;
        }
    }

    if (newCell) {
        var xy = getMidCell(getNeighbourCellNum(curCellNum, newCell, rotation));
        target.x = xy[0];
        target.y = xy[1];
    }
}
