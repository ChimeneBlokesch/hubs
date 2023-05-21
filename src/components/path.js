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
        idRenderer: { type: 'string' }
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

        if (this.data.speedNPC == 0) {
            // This component isn't needed anymore.
            this.el.removeAttribute("path");
        }
    },

    /* Creates the elements for the NPCs. */
    initializeNPCs: function () {
        // Initialize start position and use the helper vector as the current
        // position.
        // this.setStartPosition(this.helperVector);
        var colNum = 0;
        var nextRowVector = new THREE.Vector3();
        var nextColVector = new THREE.Vector3();
        const amountNPCsPerRow = this.initVectors(nextRowVector, nextColVector,
            this.helperVector);
        console.log("nextRowVector ");
        console.log(nextRowVector);
        console.log("nextColVector ");
        console.log(nextColVector);
        console.log("curPos ");
        console.log(this.helperVector);

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

            // Add the NPC to the scene.
            this.el.sceneEl.appendChild(npc);

            // Set the position of the NPC.
            npc.object3D.position.copy(this.helperVector);

            // Calculate the position of the next NPC.
            colNum = this.initNextPosition(this.helperVector,
                nextRowVector, nextColVector, amountNPCsPerRow, colNum);

            console.log("pos " + colNum);
            console.log(this.helperVector);

        }
    },

    initVectors: function (nextRowVector, nextColVector, startPos) {
        var amountNPCsPerRow = Math.floor(this.lengthX / this.data.cellSizeX);
        var factor = this.data.walkReversed ? -1 : 1;

        switch (this.widthAxis) {
            case 'x':
                nextRowVector.x = -factor * (amountNPCsPerRow - 1) * this.data.cellSizeX;
                nextRowVector.z = factor * this.data.cellSizeZ;

                nextColVector.x = factor * this.data.cellSizeX;
                break;
            case 'z':
                nextRowVector.x = factor * this.data.cellSizeX;
                nextRowVector.z = -factor * (amountNPCsPerRow - 1) * this.data.cellSizeZ;

                nextColVector = factor * this.data.cellSizeZ;

                break;
        }

        if (this.data.walkReversed) {
            startPos.x = this.data.maxX - this.data.cellSizeX / 2;
            startPos.z = this.data.maxZ - this.data.cellSizeZ / 2;
            return amountNPCsPerRow;
        }

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

        // Set crPos to next column.
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
    }
});
