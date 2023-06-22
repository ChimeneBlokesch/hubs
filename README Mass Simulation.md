# Mass Simulation component for Mozilla Hubs

The addition of Non-player Characters (NPCs) walking or standing on a
straight path, to use in Mozilla Hubs. The implementation is based on A-Frame.

## Getting started
To use the mass simulation component. Only [initNPCs.js](src/initNPCs.js) should
be imported. For Mozilla Hubs this import is found in [hub.js](src/hub.js).
This imported file will import all other files created for the mass simulation.
When imported, the mass simulation component will start if there are parameters
found matching the room name. If there aren't, there will be no mass simulation.

## Dependencies
The mass simulation component itself only requires Three.js and A-Frame to be
imported. It also uses A-Frame Instanced-Mesh (v0.7.0), but because it didn't
work to include it using npm, its only file is included as
[instanced-mesh.js](src/components/instanced-mesh.js)


## Differences between development and production code
During development it was noticed that some components from A-Frame were
replaced or removed by Mozilla Hubs. Therefore there are some code commented out
to distinguish between code to deploy on a server and code to run locally for
development purposes. This mostly contains import statements, but also some
name differences. For example A-Frame's 'gltf-model' component is replaced by
'gltf-model-plus' in Mozilla Hubs. The only consequence found is the need
to use 'this.el.object3D.needsMatrixUpdate' when changing the position while
using Hubs' version. In the code there are differences in the beginning
of some files noted by 'local' (A-Frame) and 'server' (Mozilla Hubs). When
switching between local and server, the current code should be commented out
manually.

## User-defined parameters for rooms
The parameters for the mass simulation component can be added in the file
[roomProperties.js](src/roomProperties.js). The title of the room properties
should match the room name in Hubs to enable this component.



## NPC models
The models are currently included in the source code to deploy on the server.
These are found in the [src/assets/NPCs](src/assets/NPCs) folder.
