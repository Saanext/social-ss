'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import type { Niche } from '@/config/niches';

interface PromptControlsProps {
  selectedNiche: Niche | null;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  suggestedPrompt: string | null;
  onSuggestPrompt: () => Promise<void>;
  onGenerateImage: () => Promise<void>;
  isLoadingSuggestion: boolean;
  isLoadingImage: boolean;
}

export default function PromptControls({
  selectedNiche,
  userPrompt,
  setUserPrompt,
  suggestedPrompt,
  onSuggestPrompt,
  onGenerateImage,
  isLoadingSuggestion,
  isLoadingImage,
}: PromptControlsProps) {
  const canSuggest = selectedNiche !== null && !isLoadingSuggestion && !isLoadingImage;
  const canGenerate = selectedNiche !== null && userPrompt.trim() !== '' && !isLoadingImage && !isLoadingSuggestion;

  return (
    <Card className="w-full mb-12 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Craft Your Vision</CardTitle>
        <CardDescription>
          {selectedNiche ? `Enter a prompt for ${selectedNiche.name}, or let us suggest one!` : 'Select a niche above to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="userPrompt" className="block text-sm font-medium text-foreground">
            Your Prompt
          </label>
          <Textarea
            id="userPrompt"
            placeholder={selectedNiche ? selectedNiche.promptHint : 'Describe the image you want to create...'}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={3}
            className="focus:ring-accent focus:border-accent"
            disabled={!selectedNiche || isLoadingImage || isLoadingSuggestion}
            aria-label="Image prompt"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onSuggestPrompt}
            disabled={!canSuggest}
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            aria-label="Suggest a prompt"
          >
            {isLoadingSuggestion ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Suggest a Prompt
          </Button>
          <Button
            onClick={onGenerateImage}
            disabled={!canGenerate}
            className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-accent-foreground"
            aria-label="Generate image"
          >
            {isLoadingImage ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Image
          </Button>
        </div>

        {isLoadingSuggestion && (
          <div className="text-sm text-muted-foreground flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting suggestions...
          </div>
        )}

        {suggestedPrompt && !isLoadingSuggestion && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-medium text-primary">Suggested Prompt:</p>
              <p className="text-sm text-foreground italic">"{suggestedPrompt}"</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserPrompt(suggestedPrompt)}
                disabled={isLoadingImage || isLoadingSuggestion}
              >
                Use this prompt
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
