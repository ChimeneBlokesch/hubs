import { cloneGLTF } from '../cloneGLTF.js';

AFRAME.registerComponent('gltf-setter', {
    schema: {
        // TODO: Don't know which type
        loadedGLTF: { type: 'string', default: '' },
        // Maybe like this:
        objectData: {
            default: {},
            parse: function (str) {
                return JSON.parse(str);
            }
        }
    },

    init: function () {
        if (this.data.loadedGLTF == '') {
            return;
        }


        this.el.setObject3D('mesh', cloneGLTF(this.data.loadedGLTF));
    }
});
