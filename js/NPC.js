class NPC {
    constructor(url, x, y, z, rx, ry, rz) {
        this.model = loadAssetFromURL(url);
        this.model = null;
        this.speed = 1;
        this.position = new THREE.Vector3(x, y, z);
        this.direction = new THREE.Vector3(rx, ry, rz);
    }

    get cellNum() {
        return getCellNum(this.position.x, this.position.y);
    }

    /* Let the NPC move one step. */
    step() {
        // TODO: maybe multiple different algorithms

    }

    moveBy(dx, dy, dz) {
        this.position.addBy(new Vector3(dx, dy, dz));
        HubsElementChange(this.model, newPos = this.position);
    }

    rotateBy(dx, dy, dz) {
        this.direction.addBy(new Vector3(dx, dy, dz));
        HubsElementChange(this.model, newRot = this.direction);
    }

    // TODO: functions to check for impossibility to move to a certain cell
}
