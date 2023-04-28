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
    }

    loadModels(parent) {
        for (let lod in this.renderingFiles) {
            if (lod == LOD.SPRITE) {
                continue;
            }

            let el = document.createElement("a-gltf-model");
            el.setAttribute("id", "lod" + lod);
            el.setAttribute("instanced-mesh", "positioning:world;updateMode:auto;capacity:10000;");
            el.setAttribute("src", this.renderingFiles[lod]);
            parent.appendChild(el);
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
