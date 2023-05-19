import { InstancedSkinnedMesh } from '../../lib/InstancedSkinnedMesh.js';

AFRAME.registerComponent('gltf-instanced-skinned-mesh', {
    schema: {
        src: { type: 'string' },
        draco: { type: 'boolean', default: false },
        capacity: { type: 'int', default: 1000 }
    },

    init: function () {
        this.skinnedMeshes = [];
        this.instancedMeshes = [];
        this.bones = {};

        this.indices = {};
        var loader = new THREE.GLTFLoader();

        if (this.data.draco) {
            var dracoLoader = new THREE.DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            loader.setDRACOLoader(dracoLoader);
        }

        loader.load(
            this.data.src, (gltf) => {
                // https://codesandbox.io/s/2yfgiu
                this.mixer = new THREE.AnimationMixer(gltf.scene);
                var anim = gltf.animations[12];
                this.mixer.clipAction(anim).play();
                this.duration = anim.duration;


                var scene = this.el.sceneEl.object3D;
                scene.add(gltf.scene);

                var g = new THREE.Group();
                scene.add(g);
                this.dummy = new THREE.Object3D();



                var g2 = new THREE.Group();
                scene.add(g2);
                // var o = gltf.scene.getObjectByProperty("type", "Mesh");
                // var mesh = new THREE.InstancedMesh(o.geometry, o.material, this.data.capacity);
                // mesh.setMatrixAt(0, this.dummy.matrix);
                // mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
                // g2.add(mesh);
                // this.instancedMeshes.push({ "model": o, "mesh": mesh });
                // mesh.name = o.name;
                // console.log(o);
                // console.log(mesh);
                var helper = new THREE.SkeletonHelper(scene);
                helper.material.linewidth = 10;
                helper.visible = true;
                g.add(helper);

                gltf.scene.traverse((model) => {
                    if (model.type == "Mesh") {
                        console.log("mesh")
                        console.log(model);
                        // return;
                        // https://jsfiddle.net/ybsv71hg/
                        // model.bindMatrix = new THREE.Matrix4();
                        // model.bindMatrix.elements = [];
                        // model.bindMatrixInverse = new THREE.Matrix4();
                        // model.bindMatrixInverse.elements = [];
                        // console.log(model.bindMatrix);
                        mesh = new THREE.InstancedMesh(model.geometry, model.material, this.data.capacity);
                        mesh.setMatrixAt(0, this.dummy.matrix);
                        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
                        console.log(mesh);

                        this.instancedMeshes.push({ "model": model, "mesh": mesh });
                        // model.visible = false;
                        // mesh.frustumCulled = false;
                        g.add(mesh);

                        return;
                    }

                    if (model.type == "Bone") {
                        var mesh = new THREE.Bone();
                        mesh.copy(model);

                        this.bones[mesh.name] = mesh;
                        // model.visible = false;
                        return;

                    }

                    if (model.type != "SkinnedMesh") {
                        // model.visible = false;
                        return;
                    }

                    var mesh = new InstancedSkinnedMesh(model.geometry, model.material, this.data.capacity);

                    model.visible = false;
                    mesh.frustumCulled = false;
                    mesh.bind(model.skeleton, model.bindMatrix);
                    // https://github.com/mrdoob/three.js/compare/dev...wizgrav:three.js:dev
                    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
                    console.log(model.skeleton);

                    g.add(mesh);
                    this.skinnedMeshes.push({ "model": model, "mesh": mesh });
                });


                // for (let skinnedMeshProperty of this.skinnedMeshes) {
                //     var skinnedMesh = skinnedMeshProperty.mesh;
                //     var orderedCloneBones = [];
                //     var skeleton = skinnedMeshProperty.model.skeleton;

                //     for (var bone of skeleton.bones) {
                //         orderedCloneBones.push(this.bones[bone.name]);
                //     }

                //     var cloneSkeleton = new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses);
                //     console.log(cloneSkeleton);
                //     skinnedMesh.bind(cloneSkeleton, skinnedMesh.bindMatrix);
                // }
            });
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
        for (var skinnedMesh of this.skinnedMeshes) {
            var mesh = skinnedMesh.mesh;
            mesh.instanceMatrix.needsUpdate = true;

            if (mesh.skeleton && mesh.skeleton.bonetexture) {
                mesh.skeleton.bonetexture.needsUpdate = true;
            }
        }

        for (var instancedMesh of this.instancedMeshes) {
            var mesh = instancedMesh.mesh;
            mesh.instanceMatrix.needsUpdate = true;

            if (mesh.skeleton && mesh.skeleton.bonetexture) {
                mesh.skeleton.bonetexture.needsUpdate = true;
            }
        }
    }
});
