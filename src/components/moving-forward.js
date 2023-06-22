AFRAME.registerComponent('moving-forward', {
    schema: {
        // An element with the path component.
        pathEl: { type: 'selector' }
    },

    init: function() {
        this.path = this.data.pathEl.components.path;
    },

    /* Update the position per frame. */
    tick: function (time, timeDelta) {
        // if (this.el.components["networked"] != null) {
        //     // Must have ownership of networked entity to change position.
        //     NAF.utils.getNetworkedEntity(this.el).then(networkedEl => {
        //         if (!NAF.utils.isMine(networkedEl)) {
        //             console.log('networked entity not mine');
        //             return;
        //         }
        //
        //         console.log('networked entity is mine');
        //     });
        // }

        // Calculate and set the new position.
        this.path.nextPosition(this.el.object3D.position,
            timeDelta);

        // Mozilla Hubs' 'gltf-model-plus' needs this to change position model.
        this.el.object3D.matrixNeedsUpdate = true;
    }
});
