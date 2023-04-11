class NPC {
    constructor(url) {
        // this.model = loadAssetFromURL(url);
        this.speed = 1;
        this.position = new Vector3(0, 0, 0);
        this.direction = new Vector3(0, 0, 0);
    }

    /* Let the NPC move one step. */
    step() {
        this.moveBy(1, 0, 0);
    }

    moveBy(dx, dy, dz) {
        this.position.addBy(new Vector3(dx, dy, dz));
    }

    rotateBy(dx, dy, dz) {
        this.direction.addBy(new Vector3(dx, dy, dz));
    }
}
