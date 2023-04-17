class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(asTuple = false) {
        l = [this.x, this.y, this.z]

        if (asTuple) {
            return "(" + l.join(", ") + ")";
        }

        return l.join(" ")
    }

    addBy(v2) {
        this.x += v2.x;
        this.y += v2.y;
        this.z += v2.z;
    }

    add(v2) {
        return Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z);
    }

    multBy(v2) {
        this.x *= v2.x;
        this.y *= v2.y;
        this.z *= v2.z;
    }

    mult(v2) {
        return Vector3(this.x * v2.x, this.y * v2.y, this.z * v2.z);
    }
}

