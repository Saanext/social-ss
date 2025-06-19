
// src/ai/flows/generate-image.ts
'use server';
/**
 * @fileOverview Image generation flow for a given niche, post idea, style, hook, and content.
 *
 * - generateImage - A function that generates an image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  niche: z.string().describe('The niche for the image (e.g., web development, AI solutions).'),
  postIdea: z.string().describe('The core idea or theme for the post, used to guide image generation.'),
  imageStyleName: z.string().optional().describe('The desired artistic style for the image (e.g., Photorealistic, Cartoon).'),
  hookText: z.string().optional().describe('Optional hook text to be prominently incorporated or represented in the image.'),
  contentText: z.string().optional().describe('Optional content text to be incorporated or represented in the image, perhaps more subtly than the hook.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    let textElementsInstruction = "";
    if (input.hookText || input.contentText) {
      let textStyleGuidance = "";
      if (input.imageStyleName) {
        const styleLower = input.imageStyleName.toLowerCase();
        if (styleLower.includes('vintage')) {
          textStyleGuidance = ` The typography for any rendered text should have a vintage feel, complementing the '${input.imageStyleName}' style.`;
        } else if (styleLower.includes('futuristic') || styleLower.includes('cyberpunk')) {
          textStyleGuidance = ` The typography for any rendered text should be modern, digital, or futuristic, fitting the '${input.imageStyleName}' style.`;
        } else if (styleLower.includes('cartoon')) {
          textStyleGuidance = ` Any rendered text should have a playful, cartoonish, or comic-book style font, matching the '${input.imageStyleName}' aesthetic.`;
        } else {
          textStyleGuidance = ` If rendering text, aim for a clean, legible, and aesthetically pleasing 'magazine-style' typography that complements the overall '${input.imageStyleName}' theme.`;
        }
      } else {
         textStyleGuidance = ` If rendering text, aim for a clean, legible, and aesthetically pleasing 'magazine-style' typography.`;
      }

      if (input.hookText && input.contentText) {
        textElementsInstruction = ` The image should prominently feature or thematically represent the hook: "${input.hookText}". It should also incorporate or represent the content: "${input.contentText}", perhaps more subtly.${textStyleGuidance}`;
      } else if (input.hookText) {
        textElementsInstruction = ` The image should prominently feature or thematically represent the hook: "${input.hookText}".${textStyleGuidance}`;
      } else if (input.contentText) {
        textElementsInstruction = ` The image should incorporate or thematically represent the content: "${input.contentText}".${textStyleGuidance}`;
      }
    }
    
    let constructedPrompt = `Generate a visually appealing and engaging image suitable for an Instagram post (aim for a square 1:1 aspect ratio or a portrait 4:5 aspect ratio). The image should be relevant to the niche '${input.niche}' and the post idea: "${input.postIdea}". ${textElementsInstruction}`;
    
    if (input.imageStyleName) {
      constructedPrompt += ` The overall artistic style should be '${input.imageStyleName}'.`;
    }
    
    constructedPrompt += ` Focus on high impact and direct relevance. If text elements (hook or content) are provided, the image should strongly attempt to integrate them naturally into the visual design or prominently represent their core themes. Avoid illegible, distorted, or distracting text rendering; thematic representation is preferred if direct text rendering is poor. Ensure any text is legible and well-integrated into the scene. The final image should be high quality and suitable for online sharing.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: constructedPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
         safetySettings: [ 
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    return {
      imageUrl: media.url,
    };
  }
);

