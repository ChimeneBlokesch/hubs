// // Function as shown in
// // https://www.youtube.com/watch?v=sq8d2-M-O_Q&t=1742s at 29:35
// function loadAssetFromURL(url) {
//     var el = document.createElement("a-entity");
//     el.setAttribute("media-loader", { src: url, fitToBox: true, resolve: true });
//     el.setAttribute("networked", { template: "#interactable-media" });
//     el.setAttribute("uploadedAssets");
//     return el;
// }

// function loadAssetsFromURLs(urls) {
//     var elements = [];

//     for (var url of urls) {
//         elements.push(loadAssetFromURL(url));
//     }

//     return elements;
// }

var userAvatar;

window.onload = function () {
    userAvatar = document.querySelector("#avatar-rig").object3D;
};

// Function as shown in
// https://www.youtube.com/watch?v=sq8d2-M-O_Q&t=1742s at 4:15
function HubsElementChange(el, newScale = null, newPos = null, newRot = null) {
    NAF.utils.getNetworkedEntity(el).then(networkedEl => {
        const mine = NAF.utils.isMine(networkedEl);
        var owned = NAF.utils.takeOwnership(networkedEl);

        if (newScale) networkedEl.setAttribute("scale", newScale.toString());
        if (newPos) networkedEl.setAttribute("position", newPos.toString());
        if (newRot) networkedEl.setAttribute("rotation", newRot.toString());
    });
}

// const loader = new THREE.GLTFLoader();

// function loadFromGLTF(gltfFilePath) {
//     return loader.load(gltfFilePath, (gltf) => {
//         return gltf.scene.children[0];
//         // gltf.asset
//     });

// }
