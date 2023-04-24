const DIRECTION = {
    LEFT_FORWARD: 0,
    FORWARD: 1,
    RIGHT_FORWARD: 2
}

// The y-axis is the up-down axis in A-Frame.
var upAxis = new THREE.Vector3(0, 1, 0);

// Already initialize helper vector.
var v = new THREE.Vector3();

class Path {
    constructor(minX, maxX, minZ, maxZ, amountNPCs, cellSizeX, cellSizeZ,
        speedNPC, rotationNPC, probForward, probForwardDiag) {
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;
        this.amountNPCs = amountNPCs;
        this.cellSizeX = cellSizeX;
        this.cellSizeZ = cellSizeZ;
        this.speedNPC = speedNPC;
        this.rotationNPC = rotationNPC;
        this.probForward = probForward;
        this.probForwardDiag = probForwardDiag;
    }

    get lengthX() {
        return this.maxX - this.minX;
    }

    get lengthZ() {
        return this.maxZ - this.minZ;
    }

    get widthAxis() {
        return this.lengthX < this.lengthZ ? 'x' : 'z';
    }

    get cellSizeWidth() {
        return this.widthAxis == 'x' ? this.cellSizeX : this.cellSizeZ;
    }

    get cellSizeLength() {
        return this.widthAxis == 'x' ? this.cellSizeZ : this.cellSizeX;
    }

    get angleDiag() {
        // TODO: maybe flip
        var a = this.cellSizeX;
        var b = this.cellSizeZ;

        if (this.widthAxis == 'x') {
            a = this.cellSizeZ;
            b = this.cellSizeX;
        }

        return Math.cos(a / b);
    }

    /* Update the position if it's outside the grid to the position in
    * the wrapped grid. Returns true if the update was needed and false otherwise. */
    wrapPosition(position) {
        var inRangeX = this.minX < position.x && position.x < this.maxX;
        var inRangeZ = this.minZ < position.z && position.z < this.maxZ;

        if (inRangeX && inRangeZ) {
            // No wrapping needed.
            return false;
        }

        if (!inRangeX) {
            var sign = position.x > this.maxX ? -1 : 1;
            position.x += sign * this.lengthX;
        }

        if (!inRangeZ) {
            var sign = position.z > this.maxZ ? -1 : 1;
            position.z += sign * this.lengthZ;
        }

        return true;
    }

    /* Returns the x- and z-coordinates of the next direction and the
     * based on the position and orientation of the object.
     * (x, z): the position of the object on the ground
     * angle: the orientation of the object in radians
     * direction: one of the values of DIRECTION */
    nextDirection(x, z, angle, direction) {
        // Value delta of the width axis.
        var i = 0;
        // Value delta of the other axis.
        var j = this.cellSizeLength;

        var rotationDelta = 0;

        switch (direction) {
            case DIRECTION.LEFT_FORWARD:
                j = -this.cellSizeLength;
                rotationDelta -= this.angleDiag;
                break;
            case DIRECTION.FORWARD:
                break;
            case DIRECTION.RIGHT_FORWARD:
                j = this.cellSizeLength;
                rotationDelta += this.angleDiag;
                break;
            default:
                // Invalid input, don't change position.
                return [x, z, 0];
        }

        if (this.widthAxis == 'x') {
            v.x = i;
            v.z = j;
        } else {
            v.x = j;
            v.z = i;
        }

        v.applyAxisAngle(upAxis, angle + rotationDelta);
        return [x + v.x, z + v.z, rotationDelta];
    }

    /* Returns the next center. If the width is full, return the center of the
     * cell at the beginning of the next row.  */
    initNextPosition(curPosX, curPosZ) {
        // First full up the width axis, then the length axis.
        if (curPosX == null || curPosZ == null) {
            curPosX = this.minX + this.cellSizeX / 2;
            curPosZ = this.minZ + this.cellSizeZ / 2;
            return [curPosX, curPosZ];
        }

        switch (this.widthAxis) {
            case 'x':
                if (curPosX + this.cellSizeX > this.maxX) {
                    // Go to the beginning of the next row.
                    return [this.minX + this.cellSizeX / 2, curPosZ + this.cellSizeZ];
                }

                curPosX += this.cellSizeX;
                break;
            case 'z':
                if (curPosZ + this.cellSizeZ > this.maxZ) {
                    // Go to the beginning of the next row.
                    return [curPosX + this.cellSizeX, this.minZ + this.cellSizeZ / 2];
                }

                curPosZ += this.cellSizeZ;
                break;
            default:
                break;
        }

        return [curPosX, curPosZ];
    }

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


/* Sets the new position of the target and new rotation of the
 * based on the decision of the next move. */
function nextTarget(path, target, position, rotation) {
    // The cell number of the next target relative to the current cell.
    var direction = null;
    var r = Math.random();

    if (r < path.probForward) {
        // Choose the forward cell.
        direction = DIRECTION.FORWARD;
    } else if (r < path.probForward + path.probForwardDiag) {
        // Choose the left diagonal forward cell.
        direction = DIRECTION.LEFT_FORWARD;

        if (Math.random() < 0.5) {
            // Choose the right diagonal forward cell.
            direction = DIRECTION.RIGHT_FORWARD;
        }
    }

    if (direction) {
        var xz = path.nextDirection(position.x, position.z, rotation.y, direction);
        target.x = xz[0];
        target.z = xz[1];
        rotation.y += xz[2];
    }
}
