// The length of the squared cell.
const CELL_SIZE = 1;

/* Calculates the cell number based on the x- and y-coordinates. */
function getCellNum(x, y) {
    // The minimum coordinate should become (0, 0).
    x -= MIN_X;
    y -= MIN_Y;
    return Math.floor((x / CELL_SIZE)) * AMOUNT_COLS + Math.floor(y / CELL_SIZE);
}

/* Calculates the center of the cell. */
function getMidCell(cellNum) {
    var x = Math.floor(cellNum / AMOUNT_COLS) * CELL_SIZE;
    var y = (cellNum % AMOUNT_COLS) * CELL_SIZE;
    return [x + 0.5 * CELL_SIZE + MIN_X, y + 0.5 * CELL_SIZE + MIN_Y];
}


LEFT_ABOVE = 0;
MID_ABOVE = 1;
RIGHT_ABOVE = 2;
LEFT_MID = 3;
MID_MID = 4;
RIGHT_MID = 5;
LEFT_BELOW = 6;
MID_BELOW = 7;
RIGHT_BELOW = 8;

/* Calculates the cell number of the neighbour cell given a number from 0 to 8,
 * corresponding to the grid below with 4 being the cell itself.
 * 0 1 2
 * 3 4 5
 * 6 7 8 */
// TODO: something with the orientation of the object
function getNeighbourCellNum(cellNum, neighbourNum) {
    switch (neighbourNum) {
        case LEFT_ABOVE:
            return cellNum - WIDTH - 1;
        case MID_ABOVE:
            return cellNum - WIDTH;
        case RIGHT_ABOVE:
            return cellNum - WIDTH + 1;
        case LEFT_MID:
            return cellNum - 1;
        case MID_MID:
            return cellNum;
        case RIGHT_MID:
            return cellNum + 1;
        case LEFT_BELOW:
            return cellNum + WIDTH - 1;
        case MID_BELOW:
            return cellNum + WIDTH;
        case RIGHT_BELOW:
            return cellNum + WIDTH + 1;
        default:
            break;
    }

    return cellNum;
}
