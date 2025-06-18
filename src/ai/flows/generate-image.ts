// src/ai/flows/generate-image.ts
'use server';
/**
 * @fileOverview Image generation flow for a given niche and prompt.
 *
 * - generateImage - A function that generates an image based on a niche and prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  niche: z.string().describe('The niche for the image (e.g., web development, AI solutions).'),
  prompt: z.string().describe('A short prompt describing the desired image.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: {schema: GenerateImageInputSchema},
  output: {schema: GenerateImageOutputSchema},
  prompt: `You are an AI image generator specializing in creating images for various niches.

  Based on the given niche and prompt, generate a detailed and visually appealing image.
  Incorporate prompt engineering techniques to enhance the quality of the image.

  Niche: {{{niche}}}
  Prompt: {{{prompt}}}
  
  Output should be a base64 encoded data URI for the image.
  `,
});

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      imageUrl: media.url,
    };
  }
);
