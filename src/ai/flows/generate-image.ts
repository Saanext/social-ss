
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
        textStyleGuidance = ` The typography and style of any rendered text should complement the overall '${input.imageStyleName}' aesthetic (e.g., for 'Vintage', use vintage-style lettering; for 'Futuristic', use modern or digital-style lettering).`;
      }

      if (input.hookText && input.contentText) {
        textElementsInstruction = `The image must visually represent or incorporate themes from the hook: "${input.hookText}" (ideally displayed prominently or as a key visual element) and the content: "${input.contentText}" (this could be represented more subtly or thematically).${textStyleGuidance}`;
      } else if (input.hookText) {
        textElementsInstruction = `The image must visually represent or prominently incorporate the theme from the hook: "${input.hookText}".${textStyleGuidance}`;
      } else if (input.contentText) {
        textElementsInstruction = `The image must visually represent or incorporate the theme from the content: "${input.contentText}".${textStyleGuidance}`;
      }
    }
    
    let constructedPrompt = `Generate a visually appealing and engaging image suitable for the niche '${input.niche}', based on the post idea: "${input.postIdea}". ${textElementsInstruction}`;
    
    if (input.imageStyleName) {
      constructedPrompt += ` The overall image should be in a '${input.imageStyleName}' style.`;
    }
    
    constructedPrompt += ` Focus on clarity, high impact, and direct relevance to the post idea. If text elements (hook or content) are provided, the image should strongly attempt to integrate them naturally into the visual design or prominently represent their core themes. Avoid illegible or distracting text rendering; thematic representation is preferred if direct text rendering is poor. Ensure any text is legible and well-integrated.`;

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
