
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
  content: z.string().describe('Very short and catchy content (1-2 sentences) suitable for an Instagram post, generated based on the post idea.'),
});
export type GenerateHookContentOutput = z.infer<typeof GenerateHookContentOutputSchema>;

export async function generateHookContent(input: GenerateHookContentInput): Promise<GenerateHookContentOutput> {
  return generateHookContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHookContentPrompt',
  input: {schema: GenerateHookContentInputSchema},
  output: {schema: GenerateHookContentOutputSchema},
  prompt: `You are a creative content assistant specializing in Instagram posts.
{{#if niche}}
You are focusing on content for the '{{{niche}}}' niche.
{{/if}}
Based on the following post idea, generate a catchy hook and very short, catchy content (1-2 sentences) suitable for an Instagram post.

Post Idea: {{{postIdea}}}

Output the hook and content in the specified format. Ensure the hook is engaging and the content is concise, catchy, and Instagram-ready.`,
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
