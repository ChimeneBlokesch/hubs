class RoomProperties {
    constructor(paths, renderingFiles, renderingAlgo,
        thHighMedium, thMediumLow, thLowSprite) {
        this.paths = paths;

        this.renderingFiles = renderingFiles;
        this.renderingAlgo = renderingAlgo;
        this.thHighMedium = thHighMedium;
        this.thMediumLow = thMediumLow;
        this.thLowSprite = thLowSprite;
        this.loadedEntities = {};
    }

    /* Selects the scene element. */
    get parent() {
        return document.querySelector("a-scene");
    }

    /* Creates a a-entity element with instanced mesh component
     * for the model corresponding to the given LOD. */
    loadModel(lod) {
        if (this.loadedEntities[lod] != null) {
            // Model already loaded.
            return;
        }

        let el = document.createElement("a-entity");
        let attName = "gltf-model";

        if (lod == LOD.SPRITE) {
            el.setAttribute("geometry", "primitive:plane");
            el.setAttribute("material", {
                "src": this.renderingFiles[lod],
                "alphaTest": 0.5,
                "side": "double"
            });
        }

        el.setAttribute(attName, this.renderingFiles[lod]);
        el.setAttribute("id", "lod" + lod);
        el.setAttribute("instanced-mesh", {
            "positioning": "world",
            "updateMode": "auto",
            "capacity": 500
        });

        this.parent.appendChild(el);
        this.loadedEntities[lod] = true;
    }
}
