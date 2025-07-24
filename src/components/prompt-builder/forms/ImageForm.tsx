
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImageFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const ImageForm: React.FC<ImageFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (field: string, value: string) => {
    onChange(field, value);
  };

  // Common fields for all image types
  const renderCommonFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="subject">Main Subject/Content</Label>
        <Textarea
          id="subject"
          name="subject"
          placeholder="Describe the primary subject, objects, or elements in the image..."
          value={formData.subject || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="style">Visual Style</Label>
        <Select 
          value={formData.style || ""} 
          onValueChange={(value) => handleSelectChange("style", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select visual style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="photorealistic">Photorealistic</SelectItem>
            <SelectItem value="digital-art">Digital Art</SelectItem>
            <SelectItem value="oil-painting">Oil Painting</SelectItem>
            <SelectItem value="watercolor">Watercolor</SelectItem>
            <SelectItem value="pencil-sketch">Pencil Sketch</SelectItem>
            <SelectItem value="3d-render">3D Render</SelectItem>
            <SelectItem value="pixel-art">Pixel Art</SelectItem>
            <SelectItem value="cartoon">Cartoon</SelectItem>
            <SelectItem value="anime">Anime/Manga</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
            <SelectItem value="surreal">Surreal</SelectItem>
            <SelectItem value="vintage">Vintage</SelectItem>
            <SelectItem value="futuristic">Futuristic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="details">Visual Details</Label>
        <Textarea
          name="details"
          placeholder="Colors, lighting, mood, atmosphere, textures..."
          value={formData.details || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
    </>
  );

  // Subcategory-specific fields
  const renderSubcategoryFields = () => {
    switch (subCategory) {
      case "illustration":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="artisticInfluence">Artistic Influence/Reference</Label>
              <Input
                name="artisticInfluence"
                placeholder="Specific artists, art movements, or styles to reference"
                value={formData.artisticInfluence || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="colorPalette">Color Palette</Label>
              <Input
                name="colorPalette"
                placeholder="e.g., Deep cerulean blue with gold accents, warm earth tones"
                value={formData.colorPalette || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lighting">Lighting Specifications</Label>
              <Textarea
                name="lighting"
                placeholder="Light source direction, quality (harsh/diffused), specific effects, shadows..."
                value={formData.lighting || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="composition">Composition Details</Label>
              <Input
                name="composition"
                placeholder="Perspective, focal point, depth of field, rule of thirds..."
                value={formData.composition || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "photograph":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="cameraSettings">Camera Settings</Label>
              <Input
                name="cameraSettings"
                placeholder="e.g., 85mm lens, f/1.8 aperture, shallow depth of field"
                value={formData.cameraSettings || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lightingConditions">Lighting Conditions</Label>
              <Select
                value={formData.lightingConditions || ""}
                onValueChange={(value) => handleSelectChange("lightingConditions", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lighting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural-daylight">Natural Daylight</SelectItem>
                  <SelectItem value="golden-hour">Golden Hour</SelectItem>
                  <SelectItem value="blue-hour">Blue Hour</SelectItem>
                  <SelectItem value="studio-lighting">Studio Lighting</SelectItem>
                  <SelectItem value="dramatic-shadows">Dramatic Shadows</SelectItem>
                  <SelectItem value="soft-diffused">Soft Diffused</SelectItem>
                  <SelectItem value="backlit">Backlit</SelectItem>
                  <SelectItem value="rim-lighting">Rim Lighting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="photographyStyle">Photography Style</Label>
              <Select
                value={formData.photographyStyle || ""}
                onValueChange={(value) => handleSelectChange("photographyStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select photography style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="street">Street Photography</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="fine-art">Fine Art</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="postProcessing">Post-Processing Style</Label>
              <Input
                name="postProcessing"
                placeholder="Vibrant colors, desaturated, high contrast, film simulation..."
                value={formData.postProcessing || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "3d":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="materials">Material Properties</Label>
              <Textarea
                name="materials"
                placeholder="Metallicity, roughness, subsurface scattering, transparency..."
                value={formData.materials || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lightingSetup">3D Lighting Setup</Label>
              <Textarea
                name="lightingSetup"
                placeholder="Multiple light sources, positions, types (area, spot, directional), color temperatures..."
                value={formData.lightingSetup || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="renderingStyle">Rendering Style</Label>
              <Select
                value={formData.renderingStyle || ""}
                onValueChange={(value) => handleSelectChange("renderingStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rendering approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photorealistic">Photorealistic</SelectItem>
                  <SelectItem value="stylized">Stylized</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="technical">Technical/Blueprint</SelectItem>
                  <SelectItem value="conceptual">Conceptual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="cameraSpecs">Camera Specifications</Label>
              <Input
                name="cameraSpecs"
                placeholder="Focal length, perspective type (isometric, one-point), depth of field..."
                value={formData.cameraSpecs || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "concept":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="purpose">Concept Purpose</Label>
              <Select
                value={formData.purpose || ""}
                onValueChange={(value) => handleSelectChange("purpose", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="film">Film/Movie</SelectItem>
                  <SelectItem value="game">Video Game</SelectItem>
                  <SelectItem value="product">Product Design</SelectItem>
                  <SelectItem value="architecture">Architecture</SelectItem>
                  <SelectItem value="character">Character Design</SelectItem>
                  <SelectItem value="environment">Environment Design</SelectItem>
                  <SelectItem value="vehicle">Vehicle Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="functionalAspects">Functional Aspects</Label>
              <Textarea
                name="functionalAspects"
                placeholder="How it works, practical considerations, user interaction..."
                value={formData.functionalAspects || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="worldContext">World/Universe Context</Label>
              <Textarea
                name="worldContext"
                placeholder="Setting, time period, technological level, cultural influences..."
                value={formData.worldContext || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="designLanguage">Design Language</Label>
              <Input
                name="designLanguage"
                placeholder="Aesthetic principles, shape language, visual themes..."
                value={formData.designLanguage || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "product":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="keyFeatures">Key Features to Highlight</Label>
              <Textarea
                name="keyFeatures"
                placeholder="Specific components, details, or features that must be visible..."
                value={formData.keyFeatures || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="studioSetup">Studio Setup</Label>
              <Select
                value={formData.studioSetup || ""}
                onValueChange={(value) => handleSelectChange("studioSetup", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select studio setup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white-seamless">White Seamless Background</SelectItem>
                  <SelectItem value="contextual">Contextual Environment</SelectItem>
                  <SelectItem value="gradient">Gradient Background</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle Setting</SelectItem>
                  <SelectItem value="technical">Technical/Flat Lay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="productAngle">Product Positioning</Label>
              <Select
                value={formData.productAngle || ""}
                onValueChange={(value) => handleSelectChange("productAngle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select angle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-on">Straight-on View</SelectItem>
                  <SelectItem value="three-quarter">Three-quarter Angle</SelectItem>
                  <SelectItem value="hero-angle">Hero Angle</SelectItem>
                  <SelectItem value="detail-shot">Detail/Close-up</SelectItem>
                  <SelectItem value="in-use">In-use/Action Shot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="retouchingLevel">Retouching Level</Label>
              <Select
                value={formData.retouchingLevel || ""}
                onValueChange={(value) => handleSelectChange("retouchingLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select retouching approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural (Minor adjustments)</SelectItem>
                  <SelectItem value="enhanced">Enhanced (Perfected)</SelectItem>
                  <SelectItem value="stylized">Stylized (Artistic treatment)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "character":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="characterType">Character Type/Archetype</Label>
              <Input
                name="characterType"
                placeholder="Hero, villain, mentor, trickster, guardian, etc."
                value={formData.characterType || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="personality">Personality Traits</Label>
              <Textarea
                name="personality"
                placeholder="Key personality characteristics, background, emotional associations..."
                value={formData.personality || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="physicalAttributes">Physical Attributes</Label>
              <Textarea
                name="physicalAttributes"
                placeholder="Body type, proportions, age, distinctive features, capabilities..."
                value={formData.physicalAttributes || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="costume">Costume/Clothing Design</Label>
              <Textarea
                name="costume"
                placeholder="Historical influences, materials, cultural aspects, signature accessories..."
                value={formData.costume || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="poses">Characteristic Poses</Label>
              <Input
                name="poses"
                placeholder="Signature stance, movement style, expressions..."
                value={formData.poses || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "environment":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="environmentType">Environment Type</Label>
              <Select
                value={formData.environmentType || ""}
                onValueChange={(value) => handleSelectChange("environmentType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select environment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interior">Interior Space</SelectItem>
                  <SelectItem value="exterior">Exterior/Landscape</SelectItem>
                  <SelectItem value="urban">Urban Environment</SelectItem>
                  <SelectItem value="natural">Natural Environment</SelectItem>
                  <SelectItem value="fantasy">Fantasy Setting</SelectItem>
                  <SelectItem value="scifi">Sci-Fi Setting</SelectItem>
                  <SelectItem value="historical">Historical Setting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="atmosphere">Atmosphere & Mood</Label>
              <Input
                name="atmosphere"
                placeholder="Emotional response the environment should evoke..."
                value={formData.atmosphere || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="architecturalElements">Architectural/Natural Elements</Label>
              <Textarea
                name="architecturalElements"
                placeholder="Structural features, materials, scale, vegetation, geological features..."
                value={formData.architecturalElements || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="timeOfDay">Time & Weather</Label>
              <Input
                name="timeOfDay"
                placeholder="Time of day, season, weather conditions, atmospheric effects..."
                value={formData.timeOfDay || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="storytelling">Environmental Storytelling</Label>
              <Textarea
                name="storytelling"
                placeholder="Signs of habitation, evidence of events, cultural artifacts, history..."
                value={formData.storytelling || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {renderCommonFields()}
      {renderSubcategoryFields()}
      
      {/* Common image specifications */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="mb-4">
          <Label htmlFor="perspective">Perspective/Camera Angle</Label>
          <Input
            name="perspective"
            placeholder="e.g., Bird's eye view, Close-up, Wide shot, Eye-level"
            value={formData.perspective || ""}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="aspectRatio">Aspect Ratio</Label>
          <Select 
            value={formData.aspectRatio || ""} 
            onValueChange={(value) => handleSelectChange("aspectRatio", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select aspect ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="4:3">Standard (4:3)</SelectItem>
              <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
              <SelectItem value="9:16">Portrait (9:16)</SelectItem>
              <SelectItem value="3:2">Photo (3:2)</SelectItem>
              <SelectItem value="2:3">Portrait Photo (2:3)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label htmlFor="artReferences">Additional References</Label>
          <Textarea
            name="artReferences"
            placeholder="Specific artists, artworks, films, or visual references..."
            value={formData.artReferences || ""}
            onChange={handleChange}
            className="min-h-[60px]"
          />
        </div>
      </div>
    </>
  );
};

export default ImageForm;
