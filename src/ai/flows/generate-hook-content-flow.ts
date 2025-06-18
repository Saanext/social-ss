
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
  content: z.string().describe('A short piece of content (2-3 sentences) generated based on the post idea.'),
});
export type GenerateHookContentOutput = z.infer<typeof GenerateHookContentOutputSchema>;

export async function generateHookContent(input: GenerateHookContentInput): Promise<GenerateHookContentOutput> {
  return generateHookContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHookContentPrompt',
  input: {schema: GenerateHookContentInputSchema},
  output: {schema: GenerateHookContentOutputSchema},
  prompt: `You are a creative content assistant.
{{#if niche}}
You are specializing in content for the '{{{niche}}}' niche.
{{/if}}
Based on the following post idea, generate a catchy hook and a short piece of content (around 2-3 sentences) suitable for a social media post or a brief article.

Post Idea: {{{postIdea}}}

Output the hook and content in the specified format. Ensure the hook is engaging and the content is concise and relevant.`,
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
