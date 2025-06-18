// src/ai/flows/suggest-prompt.ts
'use server';
/**
 * @fileOverview A flow that suggests prompts based on the selected niche.
 *
 * - suggestPrompt - A function that suggests a prompt based on the selected niche.
 * - SuggestPromptInput - The input type for the suggestPrompt function.
 * - SuggestPromptOutput - The return type for the suggestPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPromptInputSchema = z.object({
  niche: z.string().describe('The selected niche (e.g., web development, lead generation, AI solutions).'),
});
export type SuggestPromptInput = z.infer<typeof SuggestPromptInputSchema>;

const SuggestPromptOutputSchema = z.object({
  promptSuggestion: z.string().describe('A suggested prompt for generating an image based on the selected niche.'),
});
export type SuggestPromptOutput = z.infer<typeof SuggestPromptOutputSchema>;

export async function suggestPrompt(input: SuggestPromptInput): Promise<SuggestPromptOutput> {
  return suggestPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPromptPrompt',
  input: {schema: SuggestPromptInputSchema},
  output: {schema: SuggestPromptOutputSchema},
  prompt: `You are an AI prompt engineer specializing in generating prompts for text-to-image models.

  Based on the selected niche provided by the user, suggest a prompt that would produce a visually appealing image.
  The prompt should be descriptive and specific.

  Selected Niche: {{{niche}}}

  Suggested Prompt: `,
});

const suggestPromptFlow = ai.defineFlow(
  {
    name: 'suggestPromptFlow',
    inputSchema: SuggestPromptInputSchema,
    outputSchema: SuggestPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
