
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ImageOff, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GeneratedImageProps {
  imageUrl: string | null;
  altText: string;
  isLoading: boolean;
  onDownload: () => void;
  nicheName?: string;
  hookText?: string;
  contentText?: string;
  selectedStyleName?: string | null;
  hookFontSize: number;
  contentFontSize: number;
}

export default function GeneratedImage({ 
  imageUrl, 
  altText, 
  isLoading, 
  onDownload, 
  nicheName,
  hookText,
  contentText,
  selectedStyleName,
  hookFontSize,
  contentFontSize,
}: GeneratedImageProps) {
  const placeholderHint = nicheName ? `tech ${nicheName.toLowerCase().replace(' ', '')}` : "digital art";
  const showTextPreviewCanvas = !isLoading && !imageUrl && (hookText || contentText);

  let textPreviewFontFamilyClass = 'font-sans'; // Default to sans-serif

  if (selectedStyleName) {
    const styleLower = selectedStyleName.toLowerCase();
    if (styleLower.includes('vintage') || styleLower.includes('impressionistic') || styleLower.includes('organic')) {
      textPreviewFontFamilyClass = 'font-serif';
    } else if (styleLower.includes('futuristic') || styleLower.includes('cyberpunk') || styleLower.includes('minimalist') || styleLower.includes('abstract')) {
      textPreviewFontFamilyClass = 'font-mono'; // Monospace can give a techy/minimalist feel
    }
  }


  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6 flex flex-col items-center space-y-6">
        <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center relative">
          {isLoading && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating your masterpiece...</p>
              <Skeleton className="absolute inset-0 w-full h-full" />
            </div>
          )}
          {!isLoading && imageUrl && (
            <Image
              src={imageUrl}
              alt={altText || "Generated image"}
              width={600}
              height={400}
              className="object-contain w-full h-full"
              priority 
            />
          )}
          {showTextPreviewCanvas && (
             <div className={cn("w-full h-full relative bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center p-4 overflow-hidden", textPreviewFontFamilyClass)}>
                <Image
                    src={`https://placehold.co/600x400.png?text=${selectedStyleName || nicheName || 'Preview'}`}
                    alt="Preview background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20 dark:opacity-10 absolute inset-0"
                    data-ai-hint={`${selectedStyleName || ''} ${placeholderHint}`}
                />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-4"> 
                    {hookText && (
                    <div
                        style={{ fontSize: `${hookFontSize}px` }}
                        className="p-2 bg-black/50 text-white rounded max-w-[90%] text-center break-words shadow-lg"
                    >
                        {hookText}
                    </div>
                    )}
                    
                    {hookText && !contentText && <div className="flex-grow"></div>}
                    {!hookText && contentText && <div className="flex-grow"></div>}
                    
                    {contentText && (
                    <div
                        style={{ fontSize: `${contentFontSize}px` }}
                        className="p-2 bg-black/50 text-white rounded max-w-[90%] text-center break-words shadow-lg"
                    >
                        {contentText}
                    </div>
                    )}
                </div>
                <p className="absolute bottom-1 right-1 text-xs text-muted-foreground/70 bg-background/50 px-1 rounded">Text Preview</p>
            </div>
          )}
          {!isLoading && !imageUrl && !showTextPreviewCanvas && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
               <ImageOff className="w-24 h-24 text-muted-foreground/50 mb-4" />
               <p className="text-lg font-medium text-muted-foreground">Your Image Will Appear Here</p>
               <p className="text-sm text-muted-foreground">Select niche, add post idea, and generate hook/content to see a preview.</p>
               <Image 
                src={`https://placehold.co/600x400.png`} 
                alt="Placeholder image before generation" 
                data-ai-hint={placeholderHint}
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" 
               />
            </div>
          )}
        </div>
        <Button
          onClick={onDownload}
          disabled={!imageUrl || isLoading}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Download generated image"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
      </CardContent>
    </Card>
  );
}
