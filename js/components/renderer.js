AFRAME.registerComponent('renderer', {
    schema: {
        renderingFiles: { type: 'string', default: "" },
        renderingAlgo: { type: 'string', default: "" },
        thHighMedium: { type: 'number', default: 0 },
        thMediumLow: { type: 'number', default: 0 },
        thLowSprite: { type: 'number', default: 0 },
    },

    init: function () {
        this.parent = document.querySelector("a-scene");
        this.loadedEntities = {};
    },

    /* Creates a a-entity element with instanced mesh component
     * for the model corresponding to the given LOD. */
    loadModel: function (lod) {
        if (this.loadedEntities[lod] != null) {
            // Model already loaded.
            return;
        }

        let el = document.createElement("a-entity");
        let attName = "gltf-model";

        if (lod == LOD.SPRITE) {
            el.setAttribute("geometry", "primitive:plane");
            el.setAttribute("material", {
                "src": this.data.renderingFiles[lod],
                "alphaTest": 0.5,
                // "side": "double"
            });
        }

        el.setAttribute(attName, this.data.renderingFiles[lod]);
        el.setAttribute("id", "lod" + lod);
        el.setAttribute("instanced-mesh", {
            "positioning": "world",
            "updateMode": "auto",
            "capacity": 10000
        });

        this.parent.appendChild(el);
        this.loadedEntities[lod] = true;
    },

    /* Changes the type of the rendering (2D / 3D and low / medium / high LOD) if needed.
     * When init is set to true, it will always change. The changes are based
     * on the used rendering algorithm. */
    chooseType: function (el, init = false) {
        var thLowSprite;

        switch (this.data.renderingAlgo) {
            case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
                // Only set threshold when sprites are used.
                thLowSprite = this.data.thLowSprite;
            case RENDERING_ALGORITHMS.MODEL_COMBI:
                // Choose the lod based on the distance to the player.
                var dist = getUserAvatar().position.distanceTo(el.object3D.position);
                var lod = lodFromDistance(dist, this.data.thHighMedium,
                    this.data.thMediumLow, thLowSprite);
                this.setModel(el, lod);
                break;
            default:
                // Only specify the lod at initialization.
                if (init) {
                    this.setModel(el, ALGO2LOD[this.data.renderingAlgo]);
                }
                break;
        }
    },

    /* Sets the model corresponding to the LOD to the object. */
    setModel: function (el, lod) {
        if (el.getAttribute("lod") == lod) {
            // No change.
            return;
        }

        // Assure the model is loaded.
        this.loadModel(lod);

        // Remove the old model.
        el.removeAttribute("instanced-mesh-member");

        // Add the new model.
        el.setAttribute("instanced-mesh-member", "mesh:#lod" + lod);
    },

    /* Determines the LOD based on the distance and the thresholds.  */
    lodFromDistance: function (value, thHighMedium, thMediumLow, thLowSprite = null) {
        if (value < thHighMedium) {
            return LOD.HIGH;
        }

        if (value < thMediumLow) {
            return LOD.MEDIUM;
        }

        if (thLowSprite == null || value < thLowSprite) {
            return LOD.LOW;
        }

        return LOD.SPRITE;
    }
});
