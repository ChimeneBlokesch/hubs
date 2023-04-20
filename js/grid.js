const DIRECTION = {
    LEFT_FORWARD: 0,
    FORWARD: 1,
    RIGHT_FORWARD: 2
}

// The y-axis is the up-down axis in A-Frame.
var axis = new THREE.Vector3(0, 1, 0);

// Already initialize helper vector.
var v = new THREE.Vector3();

/* Returns the x- and z-coordinates of the next direction and the
 * based on the position and orientation of the object.
 * (x, z): the position of the object on the ground
 * angle: the orientation of the object in radians
 * direction: one of the values of DIRECTION */
function nextDirection(x, z, angle, direction) {
    // Value delta of the width axis.
    i = 0;
    // Value delta of the other axis.
    j = ROOM.cellSize;

    rotationDelta = 0;

    switch (direction) {
        case DIRECTION.LEFT_FORWARD:
            j = -ROOM.cellSize;
            rotationDelta -= ROOM.angleDiag;
            break;
        case DIRECTION.FORWARD:
            break;
        case DIRECTION.RIGHT_FORWARD:
            j = ROOM.cellSize;
            rotationDelta += ROOM.angleDiag;
            break;
        default:
            // Invalid input, don't change position.
            return [x, z, 0];
    }

    if (ROOM.widthAxis == 'x') {
        v.x = i;
        v.z = j;
    } else {
        v.x = j;
        v.z = i;
    }

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
    var inRangeX = ROOM.minX < position.x && position.x < ROOM.maxX;
    var inRangeZ = ROOM.minZ < position.z && position.z < ROOM.maxZ;

    if (inRangeX && inRangeZ) {
        // No wrapping needed.
        return false;
    }

    if (!inRangeX) {
        var sign = position.x > ROOM.maxX ? -1 : 1;
        position.x += sign * ROOM.lengthX;
    }

    if (!inRangeZ) {
        var sign = position.z > ROOM.maxZ ? -1 : 1;
        position.z += sign * ROOM.lengthZ;
    }

    return true;
}
