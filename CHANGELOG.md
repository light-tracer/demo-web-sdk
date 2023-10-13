## Updates

#### 12-Oct-2023

- Added APIs to control animations and light sources.
- Removed internal 512 SPP limit.
- Added new samples.

**BREAKING CHANGES**

- Removed `getTargetSpp`. Instead of limiting sample count on engine level it is now controlled entirely by application.
- Added second argument to `Renderer` constructor. App token string is used by production version of SDK.
