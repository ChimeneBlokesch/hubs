import { cloneGLTF } from '../cloning.js';

AFRAME.registerComponent('gltf-setter', {
    schema: {
        // TODO: Don't know which type
        lod: { type: 'number', default: 0 },
        // Maybe like this:
        // objectData: {
        //     default: {},
        //     parse: function (str) {
        //         return JSON.parse(str);
        //     }
        // }
    },

    init: function () {
        if (this.data.lod == null) {
            return;
        }
        var loadedGLTF = ROOM.loadedGLTFs[this.data.lod];

        if (loadedGLTF == null) {
            return;
        }

        var clone = cloneGLTF(loadedGLTF);


        // this.el.setObject3D('mesh', cloneGLTF(loadedGLTF));
        this.el.setObject3D(clone);
    },

    update: function () {
        this.init();
    }


});
