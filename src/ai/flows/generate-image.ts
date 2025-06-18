
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
  hookText: z.string().optional().describe('Optional hook text to be incorporated or represented in the image.'),
  contentText: z.string().optional().describe('Optional content text to be incorporated or represented in the image.'),
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
    let constructedPrompt = `Generate a visually appealing image suitable for the niche '${input.niche}', based on the post idea: "${input.postIdea}".`;
    
    if (input.imageStyleName) {
      constructedPrompt += ` The image should be in a '${input.imageStyleName}' style.`;
    }

    if (input.hookText) {
      constructedPrompt += ` Try to visually incorporate or represent the theme of this hook: "${input.hookText}".`;
    }
    if (input.contentText) {
      constructedPrompt += ` Also, consider the essence of this content: "${input.contentText}".`;
    }
    
    constructedPrompt += ` Focus on clarity, engagement, and relevance to the post idea. If text is explicitly mentioned (hook or content), attempt to integrate it naturally into the image if the style allows, otherwise represent its theme visually.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: constructedPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      imageUrl: media.url,
    };
  }
);
