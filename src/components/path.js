AFRAME.registerComponent('path', {
    schema: {
        // The path is a rectangle parallel to the x- or z-axis.
        minX: { type: 'number', default: 0 },
        maxX: { type: 'number', default: 0 },
        minZ: { type: 'number', default: 0 },
        maxZ: { type: 'number', default: 0 },

        // The amount of NPCs that will be spawned.
        amountNPCs: { type: 'number', default: 0 },

        // The size of the cells in the path in the x- or z-axis.
        cellSizeX: { type: 'number', default: 0 },
        cellSizeZ: { type: 'number', default: 0 },

        // The speed of the NPCs.
        speedNPC: { type: 'number', default: 0 },

        // The rotation of the NPCs in radians.
        rotationNPC: { type: 'number', default: 0 },

        // If true, the NPCs will walk from the maximal coordinates to the
        // minimal coordinates. Otherwise, the NPCs will walk from the minimal
        // coordinates to the maximal coordinates.
        walkReversed: { type: 'boolean', default: false },

        // The id of the renderer element that will be used to render the NPCs.
        idRenderer: { type: 'string' },

        // Set a color to visualize the path.
        // For example 'red', 'green' or 'blue'.
        colorPlane: { type: 'string', default: '' }
    },

    init: function () {
        // The length of the path in the x- and z-axis.
        this.lengthX = this.data.maxX - this.data.minX;
        this.lengthZ = this.data.maxZ - this.data.minZ;

        // The width axis is the axis with the smallest length.
        this.widthAxis = this.lengthX < this.lengthZ ? 'x' : 'z';

        this.helperVector = new THREE.Vector3();

        // The direction of the NPCs to walk forward.
        this.direction = this.calcDirection();

        this.initializeNPCs();

        if (this.data.colorPlane != '') {
            this.plane = this.showPlane();
        }
    },

    /* Also remove all NPCs on this path and the plane to visualize the path. */
    remove: function () {
        var npcs = document.getElementsByClassName("path" + this.el.getAttribute("id"));

        for (var npc of npcs) {
            npc.remove();
        }

        if (this.plane != null) {
            this.plane.remove();
        }
    },

    /* Creates the elements for the NPCs. */
    initializeNPCs: function () {
        // Initialize start position and use the helper vector as the current
        // position.
        var colNum = 0;
        var nextRowVector = new THREE.Vector3();
        var nextColVector = new THREE.Vector3();
        const amountNPCsPerRow = this.initVectors(nextRowVector, nextColVector,
            this.helperVector);

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

            // Add a component to use the same NPC for each user in the
            // networked A-Frame.
            npc.setAttribute("networked", "");

            // Sets the rotation of the NPC.
            npc.object3D.rotation.y = this.data.rotationNPC;

            npc.setAttribute("id", "npc" + i);
            npc.setAttribute("class", "path" + this.el.getAttribute("id"));

            // Add the NPC to the scene.
            this.el.sceneEl.appendChild(npc);

            // Set the position of the NPC.
            npc.object3D.position.copy(this.helperVector);

            // Calculate the position of the next NPC.
            colNum = this.initNextPosition(this.helperVector,
                nextRowVector, nextColVector, amountNPCsPerRow, colNum);
        }
    },

    /* Sets the given vectors and returns the maximal amount of NPCs per row. */
    initVectors: function (nextRowVector, nextColVector, startPos) {
        // Maximal amount of NPCs per row.
        var amountNPCsPerRow = Math.floor(this.lengthX / this.data.cellSizeX);
        var reversedFactor = this.data.walkReversed ? -1 : 1;

        switch (this.widthAxis) {
            case 'x':
                // Go back to the first column of the row.
                nextRowVector.x = -reversedFactor * (amountNPCsPerRow - 1) * this.data.cellSizeX;
                // Go one row further.
                nextRowVector.z = reversedFactor * this.data.cellSizeZ;

                // Go one column further.
                nextColVector.x = reversedFactor * this.data.cellSizeX;
                break;
            case 'z':
                // Go back to the first column of the row.
                nextRowVector.x = reversedFactor * this.data.cellSizeX;
                // Go one row further.
                nextRowVector.z = -reversedFactor * (amountNPCsPerRow - 1) * this.data.cellSizeZ;

                // Go one column further.
                nextColVector.z = reversedFactor * this.data.cellSizeZ;

                break;
        }

        if (this.data.walkReversed) {
            // Start at the maximal coordinate. Set the position at the
            // center of the cell.
            startPos.x = this.data.maxX - this.data.cellSizeX / 2;
            startPos.z = this.data.maxZ - this.data.cellSizeZ / 2;
            return amountNPCsPerRow;
        }

        // Start at the minimal coordinate. Set the position at the
        // center of the cell.
        startPos.x = this.data.minX + this.data.cellSizeX / 2;
        startPos.z = this.data.minZ + this.data.cellSizeZ / 2;
        return amountNPCsPerRow;
    },

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

    /* Calculates the direction vector based on the speed and width axis. */
    calcDirection: function () {
        var factor = this.data.walkReversed ? -1 : 1;

        switch (this.widthAxis) {
            case 'x':
                // To walk forward, the position changes in the z-axis.
                return new THREE.Vector3(0, 0, factor * this.data.speedNPC);
            case 'z':
                // To walk forward, the position changes in the x-axis.
                return new THREE.Vector3(factor * this.data.speedNPC, 0, 0);
        }
    },

    /* Calculates the next position of a NPC on the path. */
    nextPosition: function (position, timeDelta) {
        // Uses the helper vector to calculate the delta position.
        this.helperVector.copy(this.direction);
        position.add(this.helperVector.multiplyScalar(timeDelta / 1000));

        // Update the position if it's outside the grid to the position in
        // the wrapped grid.

        if (position.x < this.data.minX) {
            position.x += this.lengthX;
        } else if (position.x > this.data.maxX) {
            position.x -= this.lengthX;
        }

        if (position.z < this.data.minZ) {
            position.z += this.lengthZ;
        } else if (position.z > this.data.maxZ) {
            position.z -= this.lengthZ;
        }
    },

    /* Shows and returns a plane to visualize the path. */
    showPlane: function () {
        var plane = document.createElement("a-plane");
        var width = this.lengthX;
        var height = this.lengthZ;

        plane.setAttribute("color", this.data.colorPlane);
        plane.setAttribute("width", width);
        plane.setAttribute("height", height);
        plane.setAttribute("rotation", "-90 0 0");
        plane.setAttribute("position", {
            x: this.data.minX + width / 2,
            y: 0,
            z: this.data.minZ + height / 2
        });

        this.el.appendChild(plane);
        return plane;
    }
});
