
// Function as shown in
// https://www.youtube.com/watch?v=sq8d2-M-O_Q&t=1742s at 29:35
function loadAssetFromURL(url) {
    var el = document.createElement("a-entity");
    AFRAME.scenes[0].appendChild(el);
    el.setAttribute("media-loader", { src: url, fitToBox: true, resolve: true });
    el.setAttribute("networked", { template: "#interactable-media" });
    el.setAttribute("uploadedAssets");
    return el;
}

function loadAssetsFromURLs(urls) {
    var elements = [];

    for (var url of urls) {
        elements.push(loadAssetFromURL(url));
    }

    return elements;
}
