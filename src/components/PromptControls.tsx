
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Lightbulb, ThumbsUp, MessageSquareText, Palette } from 'lucide-react';
import type { Niche } from '@/config/niches';
import type { ImageStyle } from '@/config/styles';
import { Separator } from '@/components/ui/separator';

interface PromptControlsProps {
  selectedNiche: Niche | null;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  suggestedPrompt: string | null;
  onSuggestPrompt: () => Promise<void>;
  onGenerateImage: () => Promise<void>;
  isLoadingSuggestion: boolean;
  isLoadingImage: boolean;
  hookText: string;
  setHookText: (text: string) => void;
  contentText: string;
  setContentText: (text: string) => void;
  styles: ImageStyle[];
  selectedStyle: ImageStyle | null;
  setSelectedStyle: (style: ImageStyle | null) => void;
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
  hookText,
  setHookText,
  contentText,
  setContentText,
  styles,
  selectedStyle,
  setSelectedStyle,
}: PromptControlsProps) {
  const anyLoading = isLoadingImage || isLoadingSuggestion;
  const canSuggest = selectedNiche !== null && !anyLoading;
  const canGenerate = selectedNiche !== null && userPrompt.trim() !== '' && !anyLoading;

  const handleStyleChange = (styleId: string) => {
    const style = styles.find(s => s.id === styleId) || null;
    setSelectedStyle(style);
  };

  return (
    <Card className="w-full mb-12 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary flex items-center">
          <Wand2 className="mr-3 h-7 w-7" /> Craft Your Vision
        </CardTitle>
        <CardDescription>
          {selectedNiche ? `Enter a prompt for ${selectedNiche.name}, or let us suggest one. Then, add details like a hook, content, and style.` : 'Select a niche above to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="userPrompt" className="block text-sm font-medium text-foreground mb-1">
            Core Image Prompt
          </Label>
          <Textarea
            id="userPrompt"
            placeholder={selectedNiche ? selectedNiche.promptHint : 'Describe the core visual elements of the image...'}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={3}
            className="focus:ring-accent focus:border-accent"
            disabled={!selectedNiche || anyLoading}
            aria-label="Core image prompt"
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Additional Details (for Preview)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="hookText" className="flex items-center text-sm font-medium text-foreground">
                <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" /> Hook Text
              </Label>
              <Input
                id="hookText"
                placeholder="e.g., Catchy headline..."
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                className="focus:ring-accent focus:border-accent"
                disabled={!selectedNiche || anyLoading}
                aria-label="Hook text"
              />
            </div>
            <div className="space-y-1">
               <Label htmlFor="imageStyle" className="flex items-center text-sm font-medium text-foreground">
                <Palette className="mr-2 h-4 w-4 text-muted-foreground" /> Image Style
              </Label>
              <Select
                value={selectedStyle?.id || ''}
                onValueChange={handleStyleChange}
                disabled={!selectedNiche || anyLoading}
              >
                <SelectTrigger id="imageStyle" className="w-full focus:ring-accent focus:border-accent" aria-label="Image style">
                  <SelectValue placeholder="Select a style..." />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="contentText" className="flex items-center text-sm font-medium text-foreground">
              <MessageSquareText className="mr-2 h-4 w-4 text-muted-foreground" /> Content Text
            </Label>
            <Textarea
              id="contentText"
              placeholder="e.g., Supporting details or a short paragraph..."
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              rows={3}
              className="focus:ring-accent focus:border-accent"
              disabled={!selectedNiche || anyLoading}
              aria-label="Content text"
            />
          </div>
        </div>

        {suggestedPrompt && !isLoadingSuggestion && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-medium text-primary">Suggested Core Prompt:</p>
              <p className="text-sm text-foreground italic">"{suggestedPrompt}"</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserPrompt(suggestedPrompt)}
                disabled={anyLoading}
              >
                Use this prompt
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
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
          Suggest Core Prompt
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
      </CardFooter>
        {isLoadingSuggestion && (
          <div className="px-6 pb-6 text-sm text-muted-foreground flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting suggestions...
          </div>
        )}
    </Card>
  );
}
