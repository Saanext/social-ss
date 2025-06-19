
'use server';
/**
 * @fileOverview A flow that generates a hook and content based on a post idea and niche.
 *
 * - generateHookContent - A function that generates a hook and content.
 * - GenerateHookContentInput - The input type for the generateHookContent function.
 * - GenerateHookContentOutput - The return type for the generateHookContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHookContentInputSchema = z.object({
  postIdea: z.string().describe('The user-provided idea for a post or topic.'),
  niche: z.string().optional().describe('The selected niche (e.g., web development, AI solutions) to provide context.'),
});
export type GenerateHookContentInput = z.infer<typeof GenerateHookContentInputSchema>;

const GenerateHookContentOutputSchema = z.object({
  hook: z.string().describe('A catchy hook generated based on the post idea.'),
  content: z.string().describe('A single, concise sentence for an Instagram post, without hashtags or emojis, based on the post idea.'),
});
export type GenerateHookContentOutput = z.infer<typeof GenerateHookContentOutputSchema>;

export async function generateHookContent(input: GenerateHookContentInput): Promise<GenerateHookContentOutput> {
  return generateHookContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHookContentPrompt',
  input: {schema: GenerateHookContentInputSchema},
  output: {schema: GenerateHookContentOutputSchema},
  prompt: `You are a creative content assistant specializing in crafting viral Instagram posts.
{{#if niche}}
You are focusing on content for the '{{{niche}}}' niche.
{{/if}}
Based on the following post idea, generate:
1. A highly engaging and catchy hook.
2. A single, concise, and impactful sentence for an Instagram caption that grabs attention. This sentence must not contain any hashtags or emojis.

Post Idea: {{{postIdea}}}

Output the hook and content in the specified format.
Ensure the hook is attention-grabbing and the content is a single, powerful, Instagram-ready sentence without hashtags or emojis.
Aim for good impact with the content.`,
});

const generateHookContentFlow = ai.defineFlow(
  {
    name: 'generateHookContentFlow',
    inputSchema: GenerateHookContentInputSchema,
    outputSchema: GenerateHookContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

