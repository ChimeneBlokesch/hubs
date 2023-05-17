
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
        if (this.component.model == undefined) return;
        this.time += timeDelta / 1000;
        this.time %= this.component.duration;

        this.component.mixer.setTime(this.time);

        for (var group of this.component.groups) {
            let model = group.model;

            model.position.set(
                this.el.object3D.position.x,
                this.el.object3D.position.y,
                this.el.object3D.position.z
            );

            model.updateMatrix();

            model.skeleton.bones.forEach((b) => {
                b.updateMatrixWorld();
            });

            var mesh = group.mesh;
            mesh.setMatrixAt(this.index, model.matrix);
            mesh.setBonesAt(this.index, model.skeleton);

        }

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
