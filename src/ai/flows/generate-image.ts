
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
    let textElementsInstruction = "";
    if (input.hookText && input.contentText) {
      textElementsInstruction = `The image must visually represent or incorporate the themes from the following hook: "${input.hookText}" and content: "${input.contentText}".`;
    } else if (input.hookText) {
      textElementsInstruction = `The image must visually represent or incorporate the theme from the following hook: "${input.hookText}".`;
    } else if (input.contentText) {
      textElementsInstruction = `The image must visually represent or incorporate the theme from the following content: "${input.contentText}".`;
    }
    
    let constructedPrompt = `Generate a visually appealing image suitable for the niche '${input.niche}', based on the post idea: "${input.postIdea}". ${textElementsInstruction}`;
    
    if (input.imageStyleName) {
      constructedPrompt += ` The image should be in a '${input.imageStyleName}' style.`;
    }
    
    constructedPrompt += ` Focus on clarity, engagement, and relevance to the post idea. If text elements (hook or content) are provided, the image should strongly attempt to integrate them naturally into the visual design or prominently represent their core themes.`;

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
