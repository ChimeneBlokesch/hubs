AFRAME.registerComponent('rectangle', {
    schema: {
        // The four corners of the rectangle.
        leftDown: { type: 'vec3' },
        rightDown: { type: 'vec3' },
        leftUp: { type: 'vec3' },
        rightUp: { type: 'vec3' },
        color: { type: 'string' }
    },

    init: function () {
        var verticesArray = new Array();

        // Draw the rectangle using two triangles.
        var vertices = [
            this.data.leftDown,
            this.data.rightDown,
            this.data.rightUp,

            this.data.rightUp,
            this.data.leftUp,
            this.data.leftDown
        ];

        // Get a flattened array.
        for (let vertex of vertices) {
            for (let axis of ["x", "y", "z"]) {
                verticesArray.push(vertex[axis]);
            }
        }

        var geometry = new THREE.BufferGeometry();
        var attr = new THREE.BufferAttribute(new Float32Array(verticesArray), 3);
        geometry.setAttribute("position", attr);
        attr = new THREE.BufferAttribute(new Float32Array(new THREE.Color(this.data.color)), 3);
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        var material = new THREE.MeshBasicMaterial({ color: this.data.color });
        var mesh = new THREE.Mesh(geometry, material);
        this.el.setObject3D("mesh", mesh);
    }
})
