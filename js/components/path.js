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

        // Half the size of the cells in the x- and z-axis.
        this.dx = this.data.cellSizeX / 2;
        this.dz = this.data.cellSizeZ / 2;

        // Selects the function corresponding to the width axis.
        this.initNextPosition = this.widthAxis == 'x' ? this.initNextPositionX : this.initNextPositionZ;

        this.helperVector = new THREE.Vector3();
        this.parent = document.querySelector("a-scene");

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
        this.setStartPosition(this.helperVector);

        for (var i = 0; i < this.data.amountNPCs; i++) {
            var npc = document.createElement("a-entity");

            if (this.data.speedNPC != 0) {
                // Add a component to move the NPC.
                npc.setAttribute("moving-forward", {
                    "pathEl": this.el
                });
            }

            // Add a component to render the NPC.
            npc.setAttribute("rendering-type", { "renderer": "#" + this.data.idRenderer });

            // Add a component to use the same NPC for each user in the
            // networked A-Frame.
            npc.setAttribute("networked", "");

            // Sets the rotation of the NPC.
            npc.object3D.rotation.y = this.data.rotationNPC;

            // Add the NPC to the scene.
            this.parent.appendChild(npc);

            // Set the position of the NPC.
            npc.object3D.position.copy(this.helperVector);

            // Calculate the position of the next NPC.
            this.initNextPosition(this.helperVector);
        }
    },

    /* Calculates the direction vector based on the speed and width axis. */
    calcDirection: function () {
        switch (this.widthAxis) {
            case 'x':
                // To walk forward, the position changes in the z-axis.
                return new THREE.Vector3(0, 0, this.data.speedNPC);
            case 'z':
                // To walk forward, the position changes in the x-axis.
                return new THREE.Vector3(this.data.speedNPC, 0, 0);
        }
    },

    /* Sets the start position of a NPC to the given vector. */
    setStartPosition: function (vector) {
        if (this.data.walkReversed) {
            // First position is at the maximal coordinates of the path.
            vector.set(this.data.maxX - this.dx, 0, this.data.maxZ - this.dz);
            return;
        }

        // First position is at the minimal coordinates of the path.
        vector.set(this.data.minX + this.dx, 0, this.data.minZ + this.dz);
    },

    /* Returns the next center of a cell, to be used for the next NPC.
     * If the width is full, return the center of the cell at the
     * beginning of the next row. */
    initNextPositionX: function (curPos) {
        // Go to the next cell.
        curPos.x += this.data.cellSizeX;

        if (curPos.x <= this.data.maxX) {
            // No change of row needed.
            return;
        }

        // Go to the beginning of the next row.
        curPos.x = this.data.minX + this.dx;
        curPos.z += this.dz;
    },

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionZ: function (curPos) {
        // Go to the next cell.
        curPos.z += this.data.cellSizeZ;

        if (curPos.z <= this.data.maxZ) {
            // No change of row needed.
            return;
        }

        // Go to the beginning of the next row.
        curPos.z = this.data.minZ + this.dz;
        curPos.x += this.dx;

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
