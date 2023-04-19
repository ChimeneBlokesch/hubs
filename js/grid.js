// The length of the squared cell.
const CELL_SIZE = 1;
const ANGLE_DIAG = Math.cos(CELL_SIZE / CELL_SIZE);

const DIRECTION = {
    LEFT_FORWARD: 0,
    FORWARD: 1,
    RIGHT_FORWARD: 2
}

// The y-axis is the up-down axis in A-Frame.
var axis = new THREE.Vector3(0, 1, 0);

// Already initialize helper vector.
var v = new THREE.Vector3();

/* Returns the x- and y-coordinates of the next direction and the
 * based on the position and orientation of the object.
 * (x, z): the position of the object on the ground
 * angle: the orientation of the object in radians
 * direction: one of the values of DIRECTION */
function nextDirection(x, z, angle, direction) {
    // Initialize direction vector
    v.x = 0;
    v.z = CELL_SIZE;
    rotationDelta = 0;

    switch (direction) {
        case DIRECTION.LEFT_FORWARD:
            v.x = -CELL_SIZE;
            rotationDelta -= ANGLE_DIAG;
            break;
        case DIRECTION.FORWARD:
            break;
        case DIRECTION.RIGHT_FORWARD:
            v.x = CELL_SIZE;
            rotationDelta += ANGLE_DIAG;
            break;
        default:
            // Invalid input, don't change position.
            console.log("Invalid direction");
            return [x, z, 0];
    }

    // TODO: check if this is needed
    // angle = THREE.MathUtils.degToRad(angle);
    v.applyAxisAngle(axis, angle + rotationDelta);
    return [x + v.x, z + v.z, rotationDelta];
}

/* Updates the position of the element `el` to move towards to the target.
 * https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#example-follow-component
 */
function forward(el, target, directionVec3, timeDelta, speed) {
    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var currentPosition = el.object3D.position;

    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(target).sub(currentPosition);

    // Calculate the distance.
    var distance = directionVec3.length();

    // Don't go any closer if a close proximity has been reached.
    if (distance < 0.01) { return; }

    // Scale the direction vector's magnitude down to match the speed.
    var factor = speed / distance;
    ['x', 'y', 'z'].forEach(function (axis) {
        directionVec3[axis] *= factor * (timeDelta / 1000);
    });


    // Translate the entity in the direction towards the target.
    el.setAttribute('position', {
        x: currentPosition.x + directionVec3.x,
        y: currentPosition.y + directionVec3.y,
        z: currentPosition.z + directionVec3.z
    });
}

/* Update the position if it's outside the grid to the position in
 * the wrapped grid. Returns true if the update was needed and false otherwise. */
function wrapPosition(position) {
    if (isInGrid(position)) {
        // No wrapping needed.
        return false;
    }

    position.x += -MAX_X + MIN_X;
    position.z += -MAX_Z + MIN_Z;
    return true;
}

/* Returns true if the x- and z-coordinates of a position is within the grid. */
function isInGrid(position) {
    return MIN_X < position.x < MAX_X && MIN_Z < position.z < MAX_Z;
}


// /* Calculates the cell number based on the x- and y-coordinates. */
// function getCellNum(x, y) {
//     // The minimum coordinate should become (0, 0).
//     x -= MIN_X;
//     y -= MIN_Y;
//     return Math.floor((x / CELL_SIZE)) * AMOUNT_COLS + Math.floor(y / CELL_SIZE);
// }

// /* Calculates the center of the cell. */
// function getMidCell(cellNum) {
//     var x = Math.floor(cellNum / AMOUNT_COLS) * CELL_SIZE;
//     var y = (cellNum % AMOUNT_COLS) * CELL_SIZE;
//     return [x + 0.5 * CELL_SIZE + MIN_X, y + 0.5 * CELL_SIZE + MIN_Y];
// }


// LEFT_ABOVE = 0;
// MID_ABOVE = 1;
// RIGHT_ABOVE = 2;
// LEFT_MID = 3;
// MID_MID = 4;
// RIGHT_MID = 5;
// LEFT_BELOW = 6;
// MID_BELOW = 7;
// RIGHT_BELOW = 8;

// /* Calculates the cell number of the neighbour cell given a number from 0 to 8,
//  * corresponding to the grid below with 4 being the cell itself.
//  * 0 1 2
//  * 3 4 5
//  * 6 7 8 */
// // TODO: something with the orientation of the object
// function getNeighbourCellNum(cellNum, neighbourNum, rotation) {
//     switch (neighbourNum) {
//         case LEFT_ABOVE:
//             return cellNum - WIDTH - 1;
//         case MID_ABOVE:
//             return cellNum - WIDTH;
//         case RIGHT_ABOVE:
//             return cellNum - WIDTH + 1;
//         case LEFT_MID:
//             return cellNum - 1;
//         case MID_MID:
//             return cellNum;
//         case RIGHT_MID:
//             return cellNum + 1;
//         case LEFT_BELOW:
//             return cellNum + WIDTH - 1;
//         case MID_BELOW:
//             return cellNum + WIDTH;
//         case RIGHT_BELOW:
//             return cellNum + WIDTH + 1;
//         default:
//             break;
//     }

//     return cellNum;
// }
