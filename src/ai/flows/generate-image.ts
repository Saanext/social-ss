
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
  hookText: z.string().optional().describe('Optional hook text to be prominently incorporated or represented in the image. Strive for perfect spelling and legibility if rendered.'),
  contentText: z.string().optional().describe('Optional content text to be incorporated or represented in the image, perhaps more subtly than the hook. Strive for perfect spelling and legibility if rendered.'),
  hookFontFamilyDescription: z.string().optional().describe('A description of the desired font style for the hook text (e.g., "a clean, modern sans-serif font style").'),
  contentFontFamilyDescription: z.string().optional().describe('A description of the desired font style for the content text (e.g., "a classic, elegant serif font style").'),
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
    let typographyStyleGuidance = `The typography for any rendered text should be clean, legible, and aesthetically pleasing, complementing the overall visual style.`;

    if (input.imageStyleName) {
        const styleLower = input.imageStyleName.toLowerCase();
        if (styleLower.includes('vintage')) {
          typographyStyleGuidance = `The typography for any rendered text should have a vintage feel, complementing the '${input.imageStyleName}' style.`;
        } else if (styleLower.includes('futuristic') || styleLower.includes('cyberpunk')) {
          typographyStyleGuidance = `The typography for any rendered text should be modern, digital, or futuristic, fitting the '${input.imageStyleName}' style.`;
        } else if (styleLower.includes('cartoon')) {
          typographyStyleGuidance = `Any rendered text should have a playful, cartoonish, or comic-book style font, matching the '${input.imageStyleName}' aesthetic.`;
        } else if (styleLower.includes('minimalist') || styleLower.includes('abstract')) {
           typographyStyleGuidance = `Any rendered text should be clean, minimalist, and highly legible, suiting the '${input.imageStyleName}' style.`;
        } else {
          typographyStyleGuidance = `Aim for a clean, legible, and aesthetically pleasing 'magazine-style' typography that complements the overall '${input.imageStyleName}' theme for any rendered text.`;
        }
    }

    let hookTextInstruction = "";
    if (input.hookText) {
        hookTextInstruction = ` The image should prominently feature or thematically represent the hook: "${input.hookText}".`;
        if (input.hookFontFamilyDescription) {
            hookTextInstruction += ` This hook text should ideally be rendered in ${input.hookFontFamilyDescription}.`;
        }
    }

    let contentTextInstruction = "";
    if (input.contentText) {
        contentTextInstruction = ` It should also incorporate or represent the content: "${input.contentText}", perhaps more subtly.`;
        if (input.contentFontFamilyDescription) {
            contentTextInstruction += ` This content text should ideally be rendered in ${input.contentFontFamilyDescription}.`;
        }
    }

    if (hookTextInstruction || contentTextInstruction) {
      textElementsInstruction = `${hookTextInstruction}${contentTextInstruction}`;
      if (!input.hookFontFamilyDescription && !input.contentFontFamilyDescription) {
         textElementsInstruction += ` ${typographyStyleGuidance}`; // Apply general typography guidance if no specific font styles are given
      }
    }
    
    let constructedPrompt = `Generate a visually appealing and engaging image suitable for an Instagram post (aim for a square 1:1 aspect ratio or a portrait 4:5 aspect ratio). The image should be relevant to the niche '${input.niche}' and the post idea: "${input.postIdea}".`;
    
    if (input.imageStyleName) {
      constructedPrompt += ` The overall artistic style should be '${input.imageStyleName}'.`;
    }

    constructedPrompt += ` The overall aesthetic should be very modern, high-impact, and align with cutting-edge social media post trends anticipated for 2025. Focus on direct relevance to the niche and post idea.`;
    
    constructedPrompt += textElementsInstruction;
    
    constructedPrompt += ` CRITICALLY IMPORTANT: If text elements (hook or content) are provided, the image MUST attempt to integrate them. Strive for PERFECT SPELLING and HIGH LEGIBILITY of any rendered text. The text should be naturally and creatively incorporated into the visual design or prominently represent its core themes. If specific font style descriptions are provided, attempt to match those styles. If direct text rendering results in spelling errors, illegibility, or distortion, prioritize clear thematic representation of the text's message over poor quality text rendering. The final image must be high quality and visually compelling for online sharing.`;

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
