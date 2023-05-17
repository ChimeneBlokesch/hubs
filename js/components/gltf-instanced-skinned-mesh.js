AFRAME.registerComponent('gltf-instanced-skinned-mesh', {
    dependencies: ['gltf-model'],

    schema: {
        src: { type: 'string' },
        capacity: { type: 'int', default: 1000 }
    },

    init: function () {
        var loader = new THREE.GLTFLoader();
        loader.load(
            this.data.src, (gltf) => {
                // https://codesandbox.io/s/2yfgiu

                this.model = gltf.scene.getObjectByProperty('type', 'SkinnedMesh');

                if (!this.model) {
                    console.warn("No SkinnedMesh found in gltf file " + this.data.src);
                    return;
                }

                console.log(this.model);
                this.mesh = new InstancedSkinnedMesh(this.model.geometry, this.model.material, this.data.capacity);

                this.mesh.copy(this.model);
                this.mesh.bind(this.model.skeleton, this.model.bindMatrix);
                this.model.visible = false;
                this.mesh.frustumCulled = false;
                // https://github.com/mrdoob/three.js/compare/dev...wizgrav:three.js:dev
                this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
                console.log(this.model);
                this.mixer = new THREE.AnimationMixer(gltf.scene);
                this.mixer.clipAction(gltf.animations[0]).play();
                this.duration = gltf.animations[0].duration;

                const g = new THREE.Group();

                this.el.sceneEl.object3D.add(g);

                g.add(gltf.scene);

                g.add(this.mesh);
            });

        this.indices = {};
    },

    newIndex: function () {
        for (var idx = 0; idx < this.data.capacity; idx++) {
            if (this.indices[idx] == undefined) {
                this.indices[idx] = true;
                return idx;
            }

        }
    },

    removeIndex: function (idx) {
        delete this.indices[idx];
    },

    tick: function (time, timeDelta) {
        if (!this.mesh) return;

        this.mesh.instanceMatrix.needsUpdate = true;

        if (this.mesh.skeleton && this.mesh.skeleton.bonetexture) {
            this.mesh.skeleton.bonetexture.needsUpdate = true;
        }
    }
});
