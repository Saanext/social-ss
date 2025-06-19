
'use server';
/**
 * @fileOverview A flow that generates a viral caption and hashtags based on post details.
 *
 * - generateViralCaption - A function that generates a viral caption and hashtags.
 * - GenerateViralCaptionInput - The input type for the generateViralCaption function.
 * - GenerateViralCaptionOutput - The return type for the generateViralCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateViralCaptionInputSchema = z.object({
  postIdea: z.string().describe('The core idea or theme of the post.'),
  niche: z.string().describe('The selected niche (e.g., web development, AI solutions).'),
  hookText: z.string().optional().describe('The hook text used for the post/image.'),
  contentText: z.string().optional().describe('The content text used for the post/image.'),
  imageStyleName: z.string().optional().describe('The artistic style of the generated image.'),
});
export type GenerateViralCaptionInput = z.infer<typeof GenerateViralCaptionInputSchema>;

const GenerateViralCaptionOutputSchema = z.object({
  viralCaption: z.string().describe('A highly engaging and viral caption, 280 characters or less.'),
  viralHashtags: z.string().describe('3-5 relevant and trending viral hashtags, space-separated (e.g., #tech #ai #innovation).'),
});
export type GenerateViralCaptionOutput = z.infer<typeof GenerateViralCaptionOutputSchema>;

export async function generateViralCaption(input: GenerateViralCaptionInput): Promise<GenerateViralCaptionOutput> {
  return generateViralCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateViralCaptionPrompt',
  input: {schema: GenerateViralCaptionInputSchema},
  output: {schema: GenerateViralCaptionOutputSchema},
  prompt: `You are an expert social media marketing strategist specializing in creating viral content for platforms like Instagram and Twitter/X.
Your goal is to craft a compelling caption and select highly effective hashtags based on the provided post details.

Post Details:
- Niche: {{{niche}}}
- Post Idea: {{{postIdea}}}
{{#if hookText}}- Hook: "{{{hookText}}}"{{/if}}
{{#if contentText}}- Content: "{{{contentText}}}"{{/if}}
{{#if imageStyleName}}- Image Style: {{{imageStyleName}}}{{/if}}

Instructions:
1.  Generate a highly engaging and viral caption.
    - The caption MUST be concise and impactful, 280 characters or less.
    - It should be attention-grabbing and encourage interaction (likes, comments, shares).
2.  Provide 3-5 relevant and trending viral hashtags.
    - Hashtags should be space-separated (e.g., #innovation #futuretech #socialmedia).
    - Choose hashtags that will maximize reach and visibility for the given niche and post idea.

Output the viralCaption and viralHashtags in the specified format.
Focus on creating content that has a high potential to go viral.`,
});

const generateViralCaptionFlow = ai.defineFlow(
  {
    name: 'generateViralCaptionFlow',
    inputSchema: GenerateViralCaptionInputSchema,
    outputSchema: GenerateViralCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
