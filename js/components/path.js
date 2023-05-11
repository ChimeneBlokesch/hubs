AFRAME.registerComponent('path', {
    schema: {
        minX: { type: 'number', default: 0 },
        maxX: { type: 'number', default: 0 },
        minZ: { type: 'number', default: 0 },
        maxZ: { type: 'number', default: 0 },
        amountNPCs: { type: 'number', default: 0 },
        cellSizeX: { type: 'number', default: 0 },
        cellSizeZ: { type: 'number', default: 0 },
        speedNPC: { type: 'number', default: 0 },
        rotationNPC: { type: 'number', default: 0 },
        walkReversed: { type: 'boolean', default: false },
        idRenderer: { type: 'string' }
    },

    init: function () {
        this.lengthX = this.data.maxX - this.data.minX;
        this.lengthZ = this.data.maxZ - this.data.minZ;
        this.widthAxis = this.lengthX < this.lengthZ ? 'x' : 'z';
        this.dx = this.data.cellSizeX / 2;
        this.dz = this.data.cellSizeZ / 2;

        /* Selects the function of corresponding to the width axis,
         * which is the x- or z-axis.  */
        this.initNextPosition = this.widthAxis == 'x' ? this.initNextPositionX : this.initNextPositionZ;

        this.helperVector = new THREE.Vector3();
        this.parent = document.querySelector("a-scene");
        this.direction = this.calcDirection();

        this.initializeNPCs();

        if (this.data.speedNPC == 0) {
            // This component isn't needed anymore.
            this.el.removeAttribute("path");
        }
    },

    initializeNPCs: function () {
        this.setStartPosition(this.helperVector);

        for (var i = 0; i < this.data.amountNPCs; i++) {
            var npc = document.createElement("a-entity");

            if (this.data.speedNPC != 0) {
                npc.setAttribute("moving-forward", {
                    "pathEl": this.el
                });
            }

            npc.setAttribute("rendering-type", { "renderer": "#" + this.data.idRenderer });

            npc.setAttribute("networked", "");

            npc.object3D.rotation.y = this.data.rotationNPC;

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
                return new THREE.Vector3(0, 0, this.data.speedNPC);
            case 'z':
                return new THREE.Vector3(this.data.speedNPC, 0, 0);
        }
    },

    /* Sets the start position of a NPC to the given vector. */
    setStartPosition: function (vector) {
        if (this.data.walkReversed) {
            vector.set(this.data.maxX - this.dx, 0, this.data.maxZ - this.dz);
            return;
        }

        vector.set(this.data.minX + this.dx, 0, this.data.minZ + this.dz);
    },

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionX: function (curPos) {
        curPos.x += this.data.cellSizeX;

        if (curPos.x <= this.data.maxX) {
            // The width is not full yet.
            return;
        }

        // Go to the beginning of the next row.
        curPos.x = this.data.minX + this.dx;
        curPos.z += this.dz;
    },

    /* Returns the next center of a cell. If the width is full,
     * return the center of the cell at the beginning of the next row.  */
    initNextPositionZ: function (curPos) {
        curPos.z += this.data.cellSizeZ;

        if (curPos.z <= this.data.maxZ) {
            return;
        }

        // Go to the beginning of the next row.
        curPos.z = this.data.minZ + this.dz;
        curPos.x += this.dx;

    },

    /* Calculates the next position of a NPC on the path. */
    nextPosition: function (position, timeDelta) {
        this.helperVector.copy(this.direction);
        position.add(this.helperVector.multiplyScalar(timeDelta / 1000));
        this.wrapPosition(position);
    },

    /* Update the position if it's outside the grid to the position in
    * the wrapped grid. Returns true if the update was needed and false otherwise. */
    wrapPosition: function (position) {
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
