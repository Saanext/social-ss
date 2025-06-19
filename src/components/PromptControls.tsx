
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, ThumbsUp, MessageSquareText, Palette, SparklesIcon, CaseSensitive } from 'lucide-react';
import type { Niche } from '@/config/niches';
import type { ImageStyle } from '@/config/styles';
import { Separator } from '@/components/ui/separator';
import { Slider } from "@/components/ui/slider";


interface PromptControlsProps {
  selectedNiche: Niche | null;
  onGenerateImage: () => Promise<void>;
  isLoadingImage: boolean;

  postIdea: string;
  setPostIdea: (text: string) => void;
  hookText: string;
  setHookText: (text: string) => void;
  contentText: string;
  setContentText: (text: string) => void;
  styles: ImageStyle[];
  selectedStyle: ImageStyle | null;
  setSelectedStyle: (style: ImageStyle | null) => void;
  onGenerateHookContent: () => Promise<void>;
  isLoadingHookContent: boolean;

  hookFontSize: number;
  setHookFontSize: (size: number) => void;
  contentFontSize: number;
  setContentFontSize: (size: number) => void;
}

export default function PromptControls({
  selectedNiche,
  onGenerateImage,
  isLoadingImage,
  postIdea,
  setPostIdea,
  hookText,
  setHookText,
  contentText,
  setContentText,
  styles,
  selectedStyle,
  setSelectedStyle,
  onGenerateHookContent,
  isLoadingHookContent,
  hookFontSize,
  setHookFontSize,
  contentFontSize,
  setContentFontSize,
}: PromptControlsProps) {
  const anyLoading = isLoadingImage || isLoadingHookContent;
  const canGenerateImage = selectedNiche !== null && postIdea.trim() !== '' && !anyLoading;
  const canGenerateHookContent = selectedNiche !== null && postIdea.trim() !== '' && !anyLoading;

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
          {selectedNiche ? `Enter a post idea for ${selectedNiche.name}. We'll use this to generate AI hook & content, and the image. Then, choose an image style.` : 'Select a niche above to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="postIdea" className="block text-sm font-medium text-foreground mb-1">
            Post Idea (Drives AI Content & Image)
          </Label>
          <Textarea
            id="postIdea"
            placeholder={selectedNiche ? `e.g., For ${selectedNiche.name}: 'The impact of quantum computing on data security'` : "e.g., 'The future of AI in web design', 'How to triple your leads in 30 days'"}
            value={postIdea}
            onChange={(e) => setPostIdea(e.target.value)}
            rows={3}
            className="focus:ring-accent focus:border-accent"
            disabled={!selectedNiche || anyLoading}
            aria-label="Post idea for AI hook, content, and image generation"
          />
        </div>
        

        <Button
            onClick={onGenerateHookContent}
            disabled={!canGenerateHookContent}
            variant="outline"
            className="w-full sm:w-auto"
            aria-label="Generate hook and content with AI"
        >
            {isLoadingHookContent ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <SparklesIcon className="mr-2 h-4 w-4" />
            )}
            Generate Hook & Content (AI)
        </Button>

        {isLoadingHookContent && (
          <div className="text-sm text-muted-foreground flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI is drafting your hook & content...
          </div>
        )}

        <Separator />
        
        <div className="space-y-6"> {/* Increased spacing for font size controls */}
          <h3 className="text-lg font-medium text-foreground">Refine Details (for Image & Preview)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
            <div className="space-y-2">
              <Label htmlFor="hookText" className="flex items-center text-sm font-medium text-foreground">
                <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" /> Hook Text
              </Label>
              <Input
                id="hookText"
                placeholder="e.g., Catchy headline (AI can generate this)"
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                className="focus:ring-accent focus:border-accent"
                disabled={!selectedNiche || anyLoading}
                aria-label="Hook text"
              />
              <div className="space-y-1">
                <Label htmlFor="hookFontSize" className="flex items-center text-xs font-medium text-muted-foreground">
                  <CaseSensitive className="mr-1 h-3 w-3" /> Hook Font Size: {hookFontSize}px
                </Label>
                <Slider
                  id="hookFontSize"
                  min={12}
                  max={72}
                  step={1}
                  value={[hookFontSize]}
                  onValueChange={(value) => setHookFontSize(value[0])}
                  disabled={!selectedNiche || anyLoading}
                  aria-label="Hook font size"
                />
              </div>
            </div>
            <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="contentText" className="flex items-center text-sm font-medium text-foreground">
              <MessageSquareText className="mr-2 h-4 w-4 text-muted-foreground" /> Content Text (Single Line for Instagram)
            </Label>
            <Input
              id="contentText"
              placeholder="e.g., Supporting details (AI can generate this for Instagram)"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              className="focus:ring-accent focus:border-accent"
              disabled={!selectedNiche || anyLoading}
              aria-label="Content text for Instagram, single line, no hashtags or emojis"
            />
             <div className="space-y-1">
                <Label htmlFor="contentFontSize" className="flex items-center text-xs font-medium text-muted-foreground">
                  <CaseSensitive className="mr-1 h-3 w-3" /> Content Font Size: {contentFontSize}px
                </Label>
                <Slider
                  id="contentFontSize"
                  min={10}
                  max={48}
                  step={1}
                  value={[contentFontSize]}
                  onValueChange={(value) => setContentFontSize(value[0])}
                  disabled={!selectedNiche || anyLoading}
                  aria-label="Content font size"
                />
              </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <Button
          onClick={onGenerateImage}
          disabled={!canGenerateImage}
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
    </Card>
  );
}
