import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

/* From algorithm 1 of
Xue Piao e.a. “Towards Web3D-Based Lightweight Crowd Evacuation Simulation”. In:
The 25th International Conference on 3D Web Technology.Web3D ’20. Virtual Event,
Republic of Korea: Association for Computing Machinery, 2020. isbn: 9781450381697.
doi: 10.1145 / 3424616.3424708.url: https://doi.org/10.1145/3424616.342
*/
export function cloneGLTF(gltf) {
    var clone = {
        animations: gltf.animations,
        scene: SkeletonUtils.clone(gltf.scene)
    }

    var skinnedMeshes = {};

    gltf.scene.traverse(node => {
        if (node.isSkinnedMesh) {
            skinnedMeshes[node.uuid] = node;
        }
    });

    var cloneBones = {};
    var cloneSkinnedMeshes = {};

    clone.scene.traverse(node => {
        if (node.isBone) {
            cloneBones[node.uuid] = node;
        }

        if (node.isSkinnedMesh) {
            cloneSkinnedMeshes[node.uuid] = node;
        }
    });

    console.log("CloneSkinnedMeshes:");
    console.log(cloneSkinnedMeshes);

    for (var uuid in cloneSkinnedMeshes) {
        var cloneSkinnedMesh = cloneSkinnedMeshes[uuid];
        console.log("CloneSkinnedMesh:");
        console.log(cloneSkinnedMesh);
        var skinnedMesh = skinnedMeshes[cloneSkinnedMesh.uuid];

        if (skinnedMesh == null) {
            continue;
        }

        var skeleton = skinnedMesh.skeleton;
        var orderedCloneBones = [];

        for (var bone of skeleton.bones) {
            var cloneBone = cloneBones[bone.name];
            orderedCloneBones.push(cloneBone);
        }

        cloneSkinnedMesh.bind(new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses), cloneSkinnedMesh.matrixWorld);
    }

    return clone;
}


// window.cloneGLTF = cloneGLTF;
// var gltf = await new THREE.GLTFLoader().loadAsync('models/low/sprite.gltf');
// var clone = cloneGLTF(gltf);


// Input: modelURL, n, sum;
// i = 0;
// for i < n do
//     arr[i] = loadModelPromise(modelURL);
// i++;
// end
// promiseAll = Promise.all(arr).then((data) =>
//     i = 0;
// for i < sum do
//     temp = i % n;
// newMesh = cloneGltf(data[temp]);
// Perform parameterization module;
// scene.add(newMesh.scene);
// i++;
// end
// );
// Onput:Various parameterization GLB models

export function parameterizationGLTF(modelURL, n, sum) {
    var GLTFLoader = new THREE.GLTFLoader();
    var arr = [];

    for (var i = 0; i < n; i++) {
        arr[i] = GLTFLoader.loadAsync(modelURL);
    }

    Promise.all(arr).then((data) => {
        for (var i = 0; i < sum; i++) {
            var temp = i % n;
            var newMesh = cloneGLTF(data[temp]);
            // Perform parameterization module;
            scene.add(newMesh.scene);
        }
    });
}
