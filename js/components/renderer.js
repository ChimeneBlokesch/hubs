AFRAME.registerComponent('renderer', {
    schema: {
        // The files that will be used to render the model per LOD.
        renderingFiles: { type: 'string', default: "" },

        // The algorithm that will be used to render the model.
        renderingAlgo: { type: 'string', default: "" },

        distanceThresholds: { type: 'array' }
    },

    init: function () {
        // Copy the LODs. When a LOD is loaded,
        // the key of the LOD will be removed.
        this.loadedEntities = Object.values(LOD);
        this.frustum = new THREE.Frustum();
        this.matrix = new THREE.Matrix4();
    },

    /* Creates a a-entity element with instanced mesh component
     * for the model corresponding to the given LOD. */
    loadModel: function (lod) {
        var index = this.loadedEntities.indexOf(lod);

        if (index == -1) {
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

        this.el.sceneEl.appendChild(el);
        delete this.loadedEntities[index];
    },

    /* Changes the type of the rendering (2D / 3D and low / medium / high LOD).
     * When init is set to true, it will always change. The changes are based
     * on the used rendering algorithm. */
    chooseType: function (el, init = false) {
        // https://stackoverflow.com/questions/49902680/aframe-entity-is-seen
        // Only render the object when it is visible by the camera.
        var cam = this.el.sceneEl.camera;

        if (cam) {
            this.frustum.setFromProjectionMatrix(this.matrix.multiplyMatrices(cam.projectionMatrix,
                cam.matrixWorldInverse));
            if (!this.frustum.containsPoint(el.object3D.position)) {
                // The point is not visible, don't render it.
                return this.setModel(el, null);
            }
        }

        switch (this.data.renderingAlgo) {
            case RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE:
            case RENDERING_ALGORITHMS.MODEL_COMBI:
                // Choose the lod based on the distance to the camera.
                this.setModel(el, this.lodFromDistance(el, cam));
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
        if (lod == null) {
            // Nothing to render, so remove the old model.
            el.removeAttribute("instanced-mesh-member");
            return;
        }

        if (el.getAttribute("instanced-mesh-member") == "mesh:#lod" + lod) {
            // No change.
            return;
        }

        // Assure the model is loaded.
        this.loadModel(lod);

        // Add the new model.
        el.setAttribute("instanced-mesh-member", "mesh:#lod" + lod);
    },

    /* Determines the LOD based on the distance and the thresholds.  */
    lodFromDistance: function (el, cam) {
        var dist = cam.el.object3D.position.distanceTo(el.object3D.position);
        var lods = [LOD.HIGH, LOD.MEDIUM, LOD.LOW];

        if (this.data.renderingAlgo == RENDERING_ALGORITHMS.MODEL_COMBI_SPRITE) {
            lods.push(LOD.SPRITE);
        }

        for (var i = 0; i < lods.length; i++) {
            if (dist < this.data.distanceThresholds[i]) {
                return lods[i];
            }
        }

        // Too far away. Don't render.
        return null;
    }
});
