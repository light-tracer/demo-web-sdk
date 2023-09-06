class ErrorType {
	SUCCESS,
	INTERRUPT,
	NO_DATA,
	ERROR,
	ERROR_IO,
	ERROR_HANDLE_INVALID,
	ERROR_NO_MEMORY,
	ERROR_PROPERTY_NOT_FOUND,
}

class VisibilityMode {
	HIDDEN,
	CAMERA_HIDDEN,
	FULLY_VISIBLE,
}

class MaterialPropertyColor {
	BASE_COLOR,
	COATING_COLOR,
	EMISSION_COLOR,
	ABSORPTION_COLOR,
	GLASS_COLOR,
}

class MaterialPropertyColor {
	BASE_COLOR,       // Base color of the surface
	COATING_COLOR,    // Absorption of the coating
	EMISSION_COLOR,   // Color of the emitted radiance
	ABSORPTION_COLOR, // Residual absorption color
	GLASS_COLOR       // Color to modulate reflection/refraction
}

class MaterialProperty {
  //! Surface metalness. Metallic model has no diffuse
  //! component and also has tinted specular highlight.
  METALNESS,

  //! Surface roughness that controls both diffuse and
  //! specular response.
  ROUGHNESS,

  //! Normalized refractive index of smooth dielectric
  //! coating layer. Use 0 for disabling coating layer,
  //! and 1 for highly reflective coating.
  CLEARCOAT,

  //! Thickness of the coating layer used for modeling
  //! absorption. Set to 0 for non-absorbing and 5 for
  //! highly absorbing coating.
  THICKNESS,

  //! Degree of anisotropy controlling an aspect ratio
  //! of specular highlight. Use 0 for isotropic model,
  //! and 1 for maximally anisotropic.
  ANISOTROPY,

  //! Adjusts base diffuse shape with Hanrahan-Krueger
  //! subsurface approximation.
  FLATNESS,

  //! Additional grazing component, primarily intended
  //! for cloth rendering.
  SHEEN,

  //! Opacity of the base surface layer.
  OPACITY,

  //! Adjusts specular reflection at normal incidence.
  //! Used instead of an explicit index of refraction.
  SPECULAR,

  //! Tints the sheen towards the base color.
  SHEEN_TINT,

  //! Tints light transmission towards the base color.
  OPACITY_TINT,

  //! Artistic control to tint the specular highlight
  //! towards the base color. The grazing specular is
  //! still achromatic.
  SPECULAR_TINT,

  /////////////////////////////////////////////////////////
  // GLass params

  //! Refractive index (Cauchy-A coefficient).
  GLASS_IOR,

  //! Dispersion value (Cauchy-B coefficient).
  GLASS_DISPERSION,

  //! Beckmann roughness of the unresolved surface.
  //! Root mean square (RMS) slope of micro-facets.
  GLASS_ROUGHNESS,

  //! Tints the reflection towards the base color.
  GLASS_REFLECT_TINT,

  //! Tints the refraction towards the base color.
  GLASS_REFRACT_TINT,

  //! Linear attenuation factor
  ABSORPTION_COEFF,
}

class TextureRole
{
  BASE_NORMAL_TEXTURE,
  BASE_COLOR_TEXTURE,
  METALNESS_TEXTURE,
  ROUGHNESS_TEXTURE,
  EMISSION_TEXTURE,
  COAT_NORMAL_TEXTURE,
  EXT_OPACITY_TEXTURE,
  IES_PROFILE_TEXTURE,
  LIGHT_SHAPE_TEXTURE,
}

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