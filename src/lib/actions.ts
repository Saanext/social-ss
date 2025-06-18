'use server';

import { suggestPrompt as suggestPromptFlow, SuggestPromptInput, SuggestPromptOutput } from '@/ai/flows/suggest-prompt';
import { generateImage as generateImageFlow, GenerateImageInput, GenerateImageOutput } from '@/ai/flows/generate-image';

export async function handleSuggestPrompt(input: SuggestPromptInput): Promise<SuggestPromptOutput> {
  try {
    const result = await suggestPromptFlow(input);
    return result;
  } catch (error) {
    console.error('Error suggesting prompt:', error);
    throw new Error('Failed to suggest prompt. Please try again.');
  }
}

export async function handleGenerateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  try {
    const result = await generateImageFlow(input);
    if (!result.imageUrl) {
      throw new Error('Image generation returned no URL.');
    }
    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
}
