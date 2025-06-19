
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ViralCaptionGeneratorProps {
  onGenerate: () => Promise<void>;
  caption: string | null;
  hashtags: string | null;
  isLoading: boolean;
  isDisabled: boolean; // To disable while main image is generating or other ops
}

export default function ViralCaptionGenerator({
  onGenerate,
  caption,
  hashtags,
  isLoading,
  isDisabled,
}: ViralCaptionGeneratorProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = async (textToCopy: string | null, type: string) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({ title: `${type} Copied!`, description: `${type} copied to clipboard.` });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Copy Failed', description: `Could not copy ${type.toLowerCase()}.` });
      console.error(`Failed to copy ${type.toLowerCase()}: `, err);
    }
  };

  return (
    <Card className="w-full shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary flex items-center">
          <Sparkles className="mr-3 h-7 w-7" />
          Craft Viral Caption
        </CardTitle>
        <CardDescription>
          Generate a viral caption and hashtags for your new image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={onGenerate}
          disabled={isLoading || isDisabled}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Generate viral caption and hashtags with AI"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Viral Caption & Hashtags (AI)
        </Button>

        {isLoading && (
          <div className="text-sm text-muted-foreground flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI is crafting your viral caption...
          </div>
        )}

        {caption && (
          <div className="space-y-2">
            <Label htmlFor="viralCaption" className="block text-sm font-medium text-foreground">
              Viral Caption (Max 280 chars)
            </Label>
            <div className="relative">
              <Textarea
                id="viralCaption"
                value={caption}
                readOnly
                rows={4}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => handleCopyToClipboard(caption, 'Caption')}
                aria-label="Copy caption"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Character count: {caption.length}</p>
          </div>
        )}

        {hashtags && (
          <div className="space-y-2">
            <Label htmlFor="viralHashtags" className="block text-sm font-medium text-foreground">
              Viral Hashtags
            </Label>
             <div className="relative">
              <Input
                id="viralHashtags"
                value={hashtags}
                readOnly
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => handleCopyToClipboard(hashtags, 'Hashtags')}
                aria-label="Copy hashtags"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
