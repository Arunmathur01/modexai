import axios from "axios";
import { getModel } from "../config/llm.model.js";
import { uploadToS3 } from "../utilis/uploadToS3.js";
import { getFroms3 } from "../utilis/getFroms3.js";

export const imageAgent = async (state) => {
  try {
    


    const llm = await getModel("coding");

    const res = await llm.invoke(`
You are an elite AI image prompt engineer.

Your job is to transform the user's request into a highly detailed, production-ready image generation prompt.

You understand:
- Composition
- Camera angles
- Lens and focal length
- Lighting
- Color theory
- Depth of field
- Perspective
- Materials and textures
- Environment and atmosphere
- Character pose and expression
- Clothing and styling
- Architecture and interior design
- Product photography
- Cinematic photography
- Digital art
- 3D rendering
- Illustrations
- Posters and advertisements
- UI/website visual assets
- Photorealistic imagery
- Concept art

### CORE RULE

Never simply repeat the user's prompt.

Analyze the user's intent and intelligently expand it into a detailed visual specification while preserving the original idea.

If the user's request is vague, make reasonable creative decisions that improve the visual result without changing the core intent.

### PROMPT CONSTRUCTION

Build the final image prompt using:

SUBJECT:
What is being shown, appearance, pose, expression, clothing and important details.

ENVIRONMENT:
Location, background, objects, architecture, atmosphere and time of day.

COMPOSITION:
Camera angle, framing, subject positioning, foreground, midground, background and perspective.

LIGHTING:
Light source, direction, intensity, shadows, highlights and ambient lighting.

CAMERA:
Shot type, lens, focal length, aperture, depth of field and focus.

STYLE:
Photorealistic, cinematic, illustration, 3D, anime, etc.

QUALITY:
High detail, sharp subject, natural textures, realistic materials and professional composition.

### IMPORTANT

Adapt the prompt to the requested image type.

Product photography:
Focus on product placement, materials, reflections, studio lighting, shadows and commercial composition.

Portrait:
Focus on facial details, expression, skin texture, hair, clothing, lighting, lens and background separation.

Cinematic scene:
Focus on storytelling, environment, atmosphere, camera and cinematic color grading.

Architecture:
Focus on structure, materials, scale, perspective and lighting.

Fantasy:
Focus on world-building, creatures, environment, magical elements and atmosphere.

Food:
Focus on ingredients, plating, texture, freshness and appetizing presentation.

Advertisement:
Focus on premium composition, product visibility, lighting and commercial aesthetics.

### TEXT IN IMAGES

If the user explicitly requests text, preserve the requested wording exactly and make it clear and legible.

Do not add unnecessary text.

### NEGATIVE PROMPT

Include relevant problems to avoid:

blurry, low quality, distorted anatomy, extra limbs, malformed hands, duplicated objects, incorrect proportions, unnatural lighting, oversaturated colors, text artifacts, watermark, cropped subject, out of frame

### OUTPUT RULE

Return ONLY the final image-generation prompt.

Do not explain your reasoning.
Do not use JSON.
Do not use Markdown code fences.

USER REQUEST:

${state.prompt}
`);

    const prompt = res.content.trim();

   
   

   

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}`;

    

    const imageRes = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    
  

  

    const buffer = Buffer.from(imageRes.data);

  

    if (!buffer || buffer.length === 0) {
      throw new Error("Generated image buffer is empty");
    }

    // ==========================================
    // 4. Detect actual image type
    // ==========================================

    const contentType =
      imageRes.headers["content-type"] || "image/jpeg";

    let extension = "jpg";

    if (contentType.includes("png")) {
      extension = "png";
    } else if (contentType.includes("webp")) {
      extension = "webp";
    } else if (contentType.includes("jpeg")) {
      extension = "jpg";
    }

    const filename = `image-${Date.now()}.${extension}`;

   

    // ==========================================
    // 5. Upload to S3
    // ==========================================

   

    const uploadResult = await uploadToS3(
      filename,
      buffer,
      contentType
    );

   
    // ==========================================
    // 6. Generate signed URL
    // ==========================================

   

    const downloadUrl = await getFroms3(
      filename,
      24 * 60 * 60
    );

    
    // ==========================================
    // 7. Return response
    // ==========================================

    

    return {
      ...state,

      aiResponse: `
# Image Generated Successfully

![Generated Image](${downloadUrl})

[Download Image](${downloadUrl})

Link expires in 24 hours.
`,
    };

  } catch (error) {
   return {
      ...state,

      aiResponse: "failed to generate image ",
    };
  }
};