## Updates

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
