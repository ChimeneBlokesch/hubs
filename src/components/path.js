// Server
import "./rectangle";

// Local
// import "./rectangle.js";

AFRAME.registerComponent('path', {
    schema: {
        // Vertices of the rectangle representing the path. The y-value
        // is only taken from beginLeft.
        beginLeft: { type: 'vec3' },
        beginRight: { type: 'vec3' },
        endLeft: { type: 'vec3' },
        endRight: { type: 'vec3' },

        // The amount of NPCs that will be spawned.
        amountNPCs: { type: 'number', default: 0 },

        // The size of the cells in the path in the x- or z-axis.
        cellWidth: { type: 'number', default: 0 },
        cellHeight: { type: 'number', default: 0 },

        // The speed of the NPCs.
        speedNPC: { type: 'number', default: 0 },

        // The rotation of the NPCs in radians.
        rotationNPC: { type: 'number', default: 0 },

        // The id of the renderer element that will be used to render the NPCs.
        idRenderer: { type: 'string' },

        // Set a color to visualize the path.
        // For example 'red', 'green' or 'blue'.
        colorPlane: { type: 'string', default: '' }
    },

    init: function () {
        this.widthAxis = new THREE.Vector3();
        this.widthAxis.subVectors(this.data.beginRight, this.data.beginLeft);
        this.heightAxis = new THREE.Vector3();
        this.heightAxis.subVectors(this.data.endLeft, this.data.beginLeft);

        this.helperVector = new THREE.Vector3();

        this.initializeNPCs();

        this.setVisualization(this.data.colorPlane != '');

        // The line corresponding to the end of the path. Determine if NPCs
        // cross this line based on the center of this line.
        var endLine = new THREE.Line3(this.data.endLeft, this.data.endRight);
        this.endPoint = new THREE.Vector3();
        endLine.getCenter(this.endPoint);
    },

    /* Also remove all NPCs on this path and the plane to visualize the path. */
    remove: function () {
        var className = "path" + this.el.getAttribute("id")
        var npc = document.querySelector("." + className);

        while (npc != null) {
            npc.classList.remove(className);
            npc.remove();
            npc = document.querySelector(".path" + this.el.getAttribute("id"));
        }

        // Also remove the visualization of the path.
        this.setVisualization(false);
    },

    /* Creates the elements for the NPCs. */
    initializeNPCs: function () {
        // Initialize start position and use the helper vector as the current
        // position.
        var colNum = 0;
        var nextRowVector = new THREE.Vector3();
        var nextColVector = new THREE.Vector3();
        var startPos = new THREE.Vector3();
        const amountNPCsPerRow = this.initVectors(nextColVector, nextRowVector,
            startPos);
        var pathName = this.el.getAttribute("id");

        for (var i = 0; i < this.data.amountNPCs; i++) {
            var npc = document.createElement("a-entity");

            if (this.data.speedNPC != 0) {
                // Add a component to move the NPC.
                npc.setAttribute("moving-forward", {
                    "pathEl": this.el
                });
            }

            // Add a component to render the NPC.
            npc.setAttribute("rendered-object", { "renderer": "#" + this.data.idRenderer });

            npc.setAttribute("id", "npc" + pathName + i);
            npc.setAttribute("class", "path" + pathName);

            // Add the NPC to the scene.
            this.el.sceneEl.appendChild(npc);

            // // Add a component to use the same NPC for each user in the
            // // networked A-Frame.
            // if (this.data.beginLeft.z == -4) { // TODO: only for debugging
            //     // Testing room
            //     npc.setAttribute("networked", "");
            // }

            // Set the position of the NPC.
            npc.object3D.position.copy(startPos);

            var target = this.helperVector;
            target.copy(startPos);
            target.add(this.heightAxis);

            // Give the NPC the same orientation as the path.
            npc.object3D.lookAt(target);

            // Sets the rotation of the NPC using the user-defined angle.
            npc.object3D.rotateY(this.data.rotationNPC);

            // Calculate the position of the next NPC.
            colNum = this.initNextPosition(startPos,
                nextRowVector, nextColVector, amountNPCsPerRow, colNum);
        }
    },

    /* Sets the given vectors and returns the maximal amount of NPCs per row. */
    initVectors: function (nextColVector, nextRowVector, startPos) {
        // Maximal amount of NPCs that can be placed in a row.
        var amountNPCsPerRow = Math.floor(this.widthAxis.length() / this.data.cellWidth);

        // Go one cell further to the right.
        nextColVector.copy(this.widthAxis);
        nextColVector.setLength(this.data.cellWidth);

        // Use startPos as helper vector first.
        var colsBackVector = startPos;
        colsBackVector.copy(nextColVector);
        colsBackVector.multiplyScalar(-(amountNPCsPerRow - 1));

        // Go back to the cell on the left of the same row
        // and go one row further.
        nextRowVector.copy(this.heightAxis);
        nextRowVector.setLength(this.data.cellHeight);
        nextRowVector.add(colsBackVector);

        // The start position is on the center of the cell on the beginning left.
        startPos.copy(nextColVector);
        startPos.divideScalar(2);
        startPos.add(this.data.beginLeft);

        // The distance from the center of the model to the ground of the plane.
        startPos.y = this.data.beginLeft.y;

        return amountNPCsPerRow;
    },

    /* Used during the initialization to determine the position of
     * the next NPC. */
    initNextPosition: function (curPos, nextRowVector, nextColVector, amountNPCsPerRow, colNum) {
        colNum += 1;

        if (colNum == amountNPCsPerRow) {
            // Set curPos to begin of first row.
            curPos.add(nextRowVector);
            colNum = 0;
            return colNum;
        }

        // Set curPos to next column.
        curPos.add(nextColVector);
        return colNum;
    },

    /* Calculates the next position of a NPC on the path.
     * Determines if the NPC should go back to the beginning of the path
     * based on the old distance to the end vector. */
    nextPosition: function (position, timeDelta) {
        // Calculates the old distance to the end of the path.
        var oldDistance = position.distanceTo(this.endPoint);

        // Uses the helper vector to calculate the delta position.
        this.helperVector.copy(this.heightAxis);
        this.helperVector.normalize();
        position.add(this.helperVector.multiplyScalar(this.data.speedNPC * timeDelta / 1000));

        // Update the position if it's outside the grid to the position in
        // the wrapped grid.

        if (position.distanceTo(this.endPoint) > oldDistance) {
            // Went passed end-vector go back to the beginning of the path.
            position.sub(this.heightAxis);
        }
    },

    /* Shows and returns a plane to visualize the path. */
    setVisualization: function (visibilty) {
        if (!visibilty) {
            if (this.plane) {
                this.plane.remove();
            }
            return;
        }

        var plane = document.createElement("a-entity");

        plane.setAttribute("rectangle", {
            "leftDown": this.data.beginLeft,
            "rightDown": this.data.beginRight,
            "leftUp": this.data.endLeft,
            "rightUp": this.data.endRight,
            "color": this.data.colorPlane
        });

        this.el.appendChild(plane);
        this.plane = plane;
    }
});
