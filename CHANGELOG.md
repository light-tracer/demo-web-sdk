## Updates

#### 28-Nov-2023

- Added camera lens API to control defocus (see jewellery sample).
- Added API to access rendered image (see api-demo sample).
- Fixed `AssignNodeToParent` function.
- Added minimal hello_lt sample that does not rely on three.js (except for camera).
- Added opacity sample demonstrating setting opacity map for material and setting image backplate.
- Added `SetEnvironmentLightShape` function to use image based environment lights (see lights demo). 
- Added API for SkyDome environment mode (see api-demo: Environment group in debug UI).

#### 06-Nov-2023

- Added API to control materials independently of nodes.
- Added API to change material type: PBR, Glass, Shadow catcher.
- Added API to load IES profiles.
- Added Jewellery configurator sample.

#### 12-Oct-2023

- Added API to control animations and light sources.
- Removed internal 512 SPP limit.
- Added new samples.

**BREAKING CHANGES**

- Removed `getTargetSpp`. Instead of limiting sample count on engine level it is now controlled entirely by application.
- Added second argument to `Renderer` constructor. App token string is used by production version of SDK.
