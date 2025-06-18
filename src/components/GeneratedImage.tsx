
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ImageOff, Loader2, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedImageProps {
  imageUrl: string | null;
  altText: string; // This will now be based on postIdea or similar
  isLoading: boolean;
  onDownload: () => void;
  nicheName?: string;
  hookText?: string;
  contentText?: string;
  selectedStyleName?: string | null;
}

export default function GeneratedImage({ 
  imageUrl, 
  altText, 
  isLoading, 
  onDownload, 
  nicheName,
  hookText,
  contentText,
  selectedStyleName
}: GeneratedImageProps) {
  const placeholderHint = nicheName ? `tech ${nicheName.toLowerCase().replace(' ', '')}` : "digital art";
  const showPreview = !isLoading && !imageUrl && (hookText || contentText || selectedStyleName);

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6 flex flex-col items-center space-y-6">
        <div className="w-full aspect-video bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center relative">
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
          {showPreview && (
             <div className="p-4 sm:p-6 border border-dashed border-primary/50 rounded-md bg-background text-left w-full max-w-md max-h-full overflow-y-auto">
              <h4 className="font-semibold mb-3 text-lg text-primary flex items-center">
                <Eye className="mr-2 h-5 w-5" /> Content Preview
              </h4>
              {selectedStyleName && (
                <div className="mb-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">Style</span>
                  <p className="text-sm text-foreground">{selectedStyleName}</p>
                </div>
              )}
              {hookText && (
                <div className="mb-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">Hook</span>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{hookText}</p>
                </div>
              )}
              {contentText && (
                <div className="mb-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">Content (Instagram)</span>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{contentText}</p>
                </div>
              )}
              {!hookText && !contentText && !selectedStyleName && (
                 <p className="text-sm text-muted-foreground">Enter details above to see a preview.</p>
              )}
              <p className="text-xs text-muted-foreground/80 mt-4 pt-2 border-t border-dashed">
                This is a text-based preview. The actual image will be generated based on your post idea and selected options.
              </p>
            </div>
          )}
          {!isLoading && !imageUrl && !showPreview && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
               <ImageOff className="w-24 h-24 text-muted-foreground/50 mb-4" />
               <p className="text-lg font-medium text-muted-foreground">Your Image Will Appear Here</p>
               <p className="text-sm text-muted-foreground">Select a niche and provide a post idea to generate an image.</p>
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
