class ErrorType {
	SUCCESS : number = 0;
	INTERRUPT : number = 1;
	NO_DATA : number = 2;
	ERROR : number = 3;
	ERROR_IO : number = 4;
	ERROR_HANDLE_INVALID : number = 5;
	ERROR_NO_MEMORY : number = 6;
	ERROR_PROPERTY_NOT_FOUND : number = 7;
}

class VisibilityMode {
	HIDDEN : number = 0;
	CAMERA_HIDDEN : number = 1;
	FULLY_VISIBLE : number = 2;
}

class MaterialPropertyColor {
	BASE_COLOR : number = 0;       // Base color of the surface
	COATING_COLOR : number = 1;    // Absorption of the coating
	EMISSION_COLOR : number = 2;   // Color of the emitted radiance
	ABSORPTION_COLOR : number = 3; // Residual absorption color
	GLASS_COLOR : number = 4;      // Color to modulate reflection/refraction
}

class MaterialProperty {
  //! Surface metalness. Metallic model has no diffuse
  //! component and also has tinted specular highlight.
  METALNESS : number = 0;

  //! Surface roughness that controls both diffuse and
  //! specular response.
  ROUGHNESS : number = 1;

  //! Normalized refractive index of smooth dielectric
  //! coating layer. Use 0 for disabling coating layer,
  //! and 1 for highly reflective coating.
  CLEARCOAT : number = 2;

  //! Thickness of the coating layer used for modeling
  //! absorption. Set to 0 for non-absorbing and 5 for
  //! highly absorbing coating.
  THICKNESS : number = 3;

  //! Degree of anisotropy controlling an aspect ratio
  //! of specular highlight. Use 0 for isotropic model,
  //! and 1 for maximally anisotropic.
  ANISOTROPY : number = 4;

  //! Adjusts base diffuse shape with Hanrahan-Krueger
  //! subsurface approximation.
  FLATNESS : number = 5;

  //! Additional grazing component, primarily intended
  //! for cloth rendering.
  SHEEN : number = 6;

  //! Opacity of the base surface layer.
  OPACITY : number = 7;

  //! Adjusts specular reflection at normal incidence.
  //! Used instead of an explicit index of refraction.
  SPECULAR : number = 8;

  //! Tints the sheen towards the base color.
  SHEEN_TINT : number = 9;

  //! Tints light transmission towards the base color.
  OPACITY_TINT : number = 10;

  //! Artistic control to tint the specular highlight
  //! towards the base color. The grazing specular is
  //! still achromatic.
  SPECULAR_TINT : number = 11;

  /////////////////////////////////////////////////////////
  // GLass params

  //! Refractive index (Cauchy-A coefficient).
  GLASS_IOR : number = 12;

  //! Dispersion value (Cauchy-B coefficient).
  GLASS_DISPERSION : number = 13;

  //! Beckmann roughness of the unresolved surface.
  //! Root mean square (RMS) slope of micro-facets.
  GLASS_ROUGHNESS : number = 14;

  //! Tints the reflection towards the base color.
  GLASS_REFLECT_TINT : number = 15;

  //! Tints the refraction towards the base color.
  GLASS_REFRACT_TINT : number = 16;

  //! Linear attenuation factor
  ABSORPTION_COEFF : number = 17;
}

class TextureRole
{
  BASE_NORMAL_TEXTURE : number = 0;
  BASE_COLOR_TEXTURE : number = 1;
  METALNESS_TEXTURE : number = 2;
  ROUGHNESS_TEXTURE : number = 3;
  EMISSION_TEXTURE : number = 4;
  COAT_NORMAL_TEXTURE : number = 5;
  EXT_OPACITY_TEXTURE : number = 6;
  IES_PROFILE_TEXTURE : number = 7;
  LIGHT_SHAPE_TEXTURE : number = 8;
}

class ContextType {
  id : number;
}
class NodeType {
  id : number;
}
class TextureType {
  id : number;
}
class ClipType {
  id : number;
}
class LightEnvType {
  id : number;
}

declare class ApiObject {

  //! Sets named parameter for the renderer.
  SetParam: (context: ContextType, name: string, value: number) => ErrorType

  //! Returns named parameter of the renderer.
  GetParam: (context: ContextType, name: string) => number

  // List of possible parameters:

  // RayOffsetFactor
  // MaxRadiance
  // RngCoherency
  // ToApplyHdrBloom
  // BloomThreshold
  // BloomSpreading
  // BloomSoftening
  // UseNearestFiltering
  // ToHideLights
  // Contrast
  // ContrastMidpoint
  // MaxBouncesTotal
  // MaxBouncesDiffuse
  // MaxBouncesGlossy
  // Saturation
  // Exposure

  //! Sets local node transformation matrix.
  //! Final (world) transformation may be affected by parent node.
  SetNodeLocalTransform : (context: ContextType, node: NodeType, matrix: number[]) => ErrorType;

  //! Sets world node transformation matrix.
  //! Local transformation will be calculated to result in target world transformation.
  SetNodeWorldTransform : (context: ContextType, node: NodeType, matrix: number[]) => ErrorType;

  //! Returns local node transformation matrix.
  GetNodeLocalTransform : (context: ContextType, node: NodeType) => number[];

  //! Returns world node transformation matrix.
  GetNodeWorldTransform : (context: ContextType, node: NodeType) => number[];

  //! Sets node material color.
  SetNodeMaterialColor: (context: ContextType, node: NodeType, property: MaterialPropertyColor, color: number[]) => ErrorType;

  //! Sets node material property.
  SetNodeMaterialValue: (context: ContextType, node: NodeType, property: MaterialProperty, value: number) => ErrorType;

  //! Returns root of scene hierarchy.
  GetSceneRootNode: (context: ContextType) => NodeType;

  //! Returens number of sub-nodes for given node.
  GetSubNodeCount: (context: ContextType, node: NodeType) => number;

  //! Returns sub-node with give index.
  GetSubNode: (context: ContextType, node: NodeType, index: number) => NodeType;

  //! Returns node name.
  GetNodeName: (context: ContextType, node: NodeType) => string;

  //! Sets node name.
  SetNodeName: (context: ContextType, node: NodeType, name: string) => ErrorType;

  //! Sets node visibility mode.
  SetNodeVisible: (context: ContextType, node: NodeType, visibilityMode: VisibilityMode) => ErrorType;

  //! Sets texture with a given role for node material.
  SetNodeTexture: (context: ContextType, node: NodeType, texture: TextureType, role: TextureRole) => ErrorType;

  //! Remove object from 3D scene.
  DeleteNode: (context: ContextType, node: NodeType) => ErrorType;

  //! Makes new environment map light source.
  AddEnvironmentLight: (context: ContextType) => ErrorType;
  
  //! Removes light source from environment map.
  DeleteEnvironmentLight: (context: ContextType, light: LightEnvType) => ErrorType;
  
  //! Returns whether light is visible.
  GetEnvironmentLightVisible: (context: ContextType, light: LightEnvType) => boolean;
  
  //! Sets light visibility.
  SetEnvironmentLightVisible: (context: ContextType, light: LightEnvType, isVisible: boolean) => ErrorType;

  //! Sets environment light direction.
  SetEnvironmentLightDirection: (context: ContextType, light: LightEnvType, direction: number[]) => ErrorType;

  //! Sets environment light color.
  SetEnvironmentLightColor: (context: ContextType, light: LightEnvType, color: number[]) => ErrorType;
  
  //! Sets named parameter for given light source.
  SetEnvironmentLightParam: (context: ContextType, light: LightEnvType, name: string, value: number) => ErrorType;
  
  //! Returns named parameter value for given light source.
  GetEnvironmentLightParam: (context: ContextType, light: LightEnvType, name: string) => number;
  
  //! Returns number of animation clips associated with the node.
  GetNodeClipCount: (context: ContextType, node: NodeType) => number;
  
  //! Gets animation clip associated with the node by index.
  GetNodeClip: (context: ContextType, node: NodeType, index: number) => ClipType;
  
  //! Evaluates animation for the given time point.
  SetClipAnimationTime: (context: ContextType, node: NodeType, clip: ClipType, animationTime: number) => ErrorType;
  
  //! Returns clip name.
  GetClipName: (context: ContextType, clip: ClipType) => string;
}

declare class View {
  setViewport: (left: number, top: number, width: number, height: number) => void;
  setCameraMatrices(viewMatrix: number[], projMatrix: number[]);
}

//! Helper class to move memory JS <=> WASM
declare class BufferDescriptor {}

declare class Renderer {
  constructor(canvasSelector: string, appToken: string);

  //! Returns context handle required by most API calls accessible through API object.
  getContextHandle: () => ContextType;

  //! Loads environment map from buffer and sets it for immediate use by renderer.
  loadEnvironmentMapFromBuffer: (buffer: BufferDescriptor) => void;

  //! Decodes the texture provided with a file buffer and returns texture handle.
  loadTextureFromBuffer: (id: string, buffer: BufferDescriptor) => TextureType;

  //! Loads GLTF scene from buffer and returns root node handle.
  loadSceneFromBuffer: (buffer: BufferDescriptor) => NodeType;

  //! Forces engine to reset frame accumulation and start rendering from scratch.
  //! Usually it is not needed to call this since the engine tracks changes of data and settings.
  resetFrameAccumulation: () => void;

  //! Tells the engine whether float texture interpolation WebGL2 extension is supported.
  setFloatTextureInterpolationSupport: (isSupported: boolean) => void;

  //! Renders consequent path tracing sample and displays currently accumulated HDR image with tone-mapping and other post-processing.
  draw: (view: View) => void;

  //! Creates view object
  createView: () => View;

  //! Destroys view object
  destroyView: (view: View) => void;
}