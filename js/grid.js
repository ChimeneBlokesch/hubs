// The length of the squared cell.
const CELL_SIZE = 1;


// TODO: how to find these?
// The range of the x- and y-coordinates.
const MIN_X = 0;
const MIN_Y = 0;
const MAX_X = 5;
const MAX_Y = 5;


const WIDTH = MAX_X - MIN_X;
const HEIGHT = MAX_Y - MIN_Y;

const AMOUNT_COLS = Math.ceil(WIDTH / CELL_SIZE);
const AMOUNT_ROWS = Math.ceil(HEIGHT / CELL_SIZE);


function getCellNum(x, y) {
    // The minimum coordinate should become (0, 0).
    x -= MIN_X;
    y -= MIN_Y;
    return Math.floor((x / CELL_SIZE)) * AMOUNT_COLS + Math.floor(y / CELL_SIZE);
}

function getMidCell(cellNum) {
    var x = Math.floor(cellNum / AMOUNT_COLS) * CELL_SIZE;
    var y = (cellNum % AMOUNT_COLS) * CELL_SIZE;
    return [x + 0.5 + MIN_X, y + 0.5 + MIN_Y];
}
