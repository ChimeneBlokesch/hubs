class RoomProperties {
    constructor(paths, renderingFiles, renderingAlgo,
        thHighMedium, thMediumLow, thLowSprite) {
        this.paths = paths;

        this.renderingFiles = renderingFiles;
        this.renderingAlgo = renderingAlgo;
        this.thHighMedium = thHighMedium;
        this.thMediumLow = thMediumLow;
        this.thLowSprite = thLowSprite;
        this.loadedGLTFs = this.getLoadedGLTFs();
        this.loadedEntities = {};
    }

    get parent() {
        return document.querySelector("a-scene");
    }

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
                "transparent": true
            });
        }

        el.setAttribute(attName, this.renderingFiles[lod]);
        el.setAttribute("id", "lod" + lod);
        el.setAttribute("instanced-mesh", "positioning:world;updateMode:auto;capacity:500;");
        this.parent.appendChild(el);
        this.loadedEntities[lod] = true;
    }

    loadModels(parent) {
        return;
        for (let lod in this.renderingFiles) {
            let el = document.createElement("a-entity");
            let attName = "gltf-model";

            if (lod == LOD.sprite) {
                el.setAttribute("geometry", "primitive:plane");
                el.setAttribute("material", "src", this.renderingFiles[lod]);
            }

            el.setAttribute(attName, this.renderingFiles[lod]);

            el.setAttribute("id", "lod" + lod);
            el.setAttribute("instanced-mesh", "positioning:world;updateMode:auto;capacity:1000; drainColor: true");
            // el.setAttribute("visible", false);
            parent.appendChild(el);
            this.loadedEntities[lod] = el;
        }
    }

    getLoadedGLTF(lod) {
        return this.loadedGLTFs[lod];
    }

    getLoadedGLTFs() {
        var loadedGLTFs = {};
        var GLTFLoader = new THREE.GLTFLoader();

        for (let lod in this.renderingFiles) {
            let file = this.renderingFiles[lod];

            if (lod == LOD.SPRITE) {
                loadedGLTFs[lod] = file;
                continue;
            }

            GLTFLoader.load(file, function (gltf) {
                loadedGLTFs[lod] = gltf.scene;
            });
        }

        return loadedGLTFs;
    }
}
