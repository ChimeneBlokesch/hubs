AFRAME.registerComponent('npc', {
    schema: {
        speed: { type: 'number', default: 0 }
    },
    init: function () {
        // The position to move towards to.
        this.target = this.el.object3D.position.clone();

        this.helperVector = new THREE.Vector3();

        this.chooseType(init = true);
    },

    tick: function (timeDelta) {
        if (this.data.speed == 0) {
            this.chooseType();
            return;
        }

        // Determine the next target.
        nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        console.log("target", this.target);
        // Go forwards to the new target.
        forward(this.el, this.target, this.helperVector, timeDelta, this.data.speed);

        // TODO: wrap grid, if NPC becomes outside bounds, teleport to beginning
        // and calculate new target. So target can be outside grid.

        if (wrapPosition(this.el.object3D.position)) {
            // The position is changed, because the target is outside the grid.
            // Determine a new target.
            nextMove(this.target, this.el.object3D.position, this.el.object3D.rotation);
        }
    },

    chooseType: function (init = false) {
        switch (RENDERING_TYPE) {
            case RENDERING_TYPES.MODEL:
                // Only specify the type at initialize.
                if (init) {
                    this.changeType(RENDERING_TYPES.MODEL);
                }

                break;
            case RENDERING_TYPES.SPRITE:
                // Only specify the type at initialize.
                if (init) {
                    this.changeType(RENDERING_TYPES.SPRITE);
                }

                break;
            case RENDERING_TYPES.COMBI:
                // Choose the type based on the distance to the player.
                var type = RENDERING_TYPES.SPRITE;

                if (userAvatar.position.distanceTo(this.position) < RENDERING_DISTANCE) {
                    type = RENDERING_TYPES.MODEL;
                }

                this.changeType(type);
                break;
            default:
                break;
        }
    },

    changeType: function (type) {
        switch (type) {
            case RENDERING_TYPES.MODEL:
                this.el.removeAttribute("src");
                this.el.setAttribute("gltf-model", NPC_MODEL);
                break;
            case RENDERING_TYPES.SPRITE:
                this.el.removeAttribute("gltf-model");
                this.el.setAttribute("src", NPC_SPRITE);
                break;
            default:
                break;
        }

    }
});
