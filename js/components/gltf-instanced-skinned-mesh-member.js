AFRAME.registerComponent('gltf-instanced-skinned-mesh-member', {
    schema: {
        mesh: { type: 'selector' },
    },

    init: function () {
        this.component = this.data.mesh.components['gltf-instanced-skinned-mesh'];
        this.time = 0;
        this.index = this.component.newIndex();
    },


    update: function () {
        this.component.removeIndex(this.index);
        this.init();
    },

    tick: function (time, timeDelta) {
        // https://codesandbox.io/s/2yfgiu
        if (this.component.skinnedMeshes.length == 0) return;
        this.time += timeDelta / 1000;
        this.time %= this.component.duration;

        this.component.mixer.setTime(this.time);

        for (let skinnedMeshProperty of this.component.skinnedMeshes) {
            let model = skinnedMeshProperty.model;
            let skinnedMesh = skinnedMeshProperty.mesh;
            var morphAttributes = skinnedMesh.geometry.morphAttributes;
            console.log("skinnedMesh");
            console.log(morphAttributes.position !== undefined || morphAttributes.normal !== undefined || (morphAttributes.color !== undefined && capabilities.isWebGL2 === true));


            model.position.copy(this.el.object3D.position);

            model.updateMatrix();

            model.skeleton.bones.forEach((b) => {
                b.visible = true;
                // b.position.copy(this.el.object3D.position);
                b.updateMatrixWorld();
            });

            skinnedMesh.setMatrixAt(this.index, model.matrix);
            skinnedMesh.setBonesAt(this.index, model.skeleton);
            skinnedMesh.instanceMatrix.needsUpdate = true;

            if (skinnedMesh.skeleton && skinnedMesh.skeleton.bonetexture) {
                skinnedMesh.skeleton.bonetexture.needsUpdate = true;
            }
        }

        var dummy = this.component.dummy;

        for (var instancedMesh of this.component.instancedMeshes) {
            var mesh = instancedMesh.mesh;
            console.log("instancedMesh");
            console.log(mesh);
            console.log('geometry');
            console.log(mesh.geometry);
            console.log('morphAttributes');
            var morphAttributes = mesh.geometry.morphAttributes;
            console.log(morphAttributes.position !== undefined || morphAttributes.normal !== undefined || (morphAttributes.color !== undefined && capabilities.isWebGL2 === true));
            dummy.position.copy(this.el.object3D.position);
            dummy.updateMatrix();

            mesh.setMatrixAt(this.index, dummy.matrix);
            mesh.instanceMatrix.needsUpdate = true;
        }

        // for (var bone of this.component.bones) {
        //     var model = bone.model;
        //     model.position.copy(this.el.object3D.position);
        //     model.updateMatrixWorld();

        //     var mesh = bone.mesh;
        //     // mesh.setMatrixAt(this.index, bone.matrixWorld);
        // }

        // return;
        // if (!this.component.mesh) return;

        // let model = this.component.model;

        // model.position.set(
        //     this.el.object3D.position.x,
        //     this.el.object3D.position.y,
        //     this.el.object3D.position.z
        // );

        // model.updateMatrix();

        // this.time += timeDelta / 1000;
        // this.time %= this.component.duration;

        // this.component.mixer.setTime(this.time);

        // model.skeleton.bones.forEach((b) => {
        //     b.updateMatrixWorld();
        // });

        // let mesh = this.component.mesh;
        // mesh.setMatrixAt(this.index, model.matrix);
        // mesh.setBonesAt(this.index, model.skeleton);

    }
});
