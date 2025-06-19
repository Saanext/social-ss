
'use server';

import { suggestPrompt as suggestPromptFlow, SuggestPromptInput, SuggestPromptOutput } from '@/ai/flows/suggest-prompt';
import { generateImage as generateImageFlow, GenerateImageInput, GenerateImageOutput } from '@/ai/flows/generate-image';
import { generateHookContent as generateHookContentFlow, GenerateHookContentInput, GenerateHookContentOutput } from '@/ai/flows/generate-hook-content-flow';
import { generateViralCaption as generateViralCaptionFlow, GenerateViralCaptionInput, GenerateViralCaptionOutput } from '@/ai/flows/generate-viral-caption-flow';

// This function is no longer used as core prompt is removed from UI.
// Consider removing if not needed elsewhere.
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

export async function handleGenerateHookContent(input: GenerateHookContentInput): Promise<GenerateHookContentOutput> {
  try {
    const result = await generateHookContentFlow(input);
    return result;
  } catch (error) {
    console.error('Error generating hook and content:', error);
    throw new Error('Failed to generate hook and content. Please try again.');
  }
}

export async function handleGenerateViralCaption(input: GenerateViralCaptionInput): Promise<GenerateViralCaptionOutput> {
  try {
    const result = await generateViralCaptionFlow(input);
    return result;
  } catch (error) {
    console.error('Error generating viral caption:', error);
    throw new Error('Failed to generate viral caption. Please try again.');
  }
}
