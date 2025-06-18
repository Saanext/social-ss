'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ImageOff, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedImageProps {
  imageUrl: string | null;
  altText: string;
  isLoading: boolean;
  onDownload: () => void;
  nicheName?: string;
}

export default function GeneratedImage({ imageUrl, altText, isLoading, onDownload, nicheName }: GeneratedImageProps) {
  const placeholderHint = nicheName ? `tech ${nicheName.toLowerCase().replace(' ', '')}` : "digital art";
  
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
          {!isLoading && !imageUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
               <ImageOff className="w-24 h-24 text-muted-foreground/50 mb-4" />
               <p className="text-lg font-medium text-muted-foreground">Your Image Will Appear Here</p>
               <p className="text-sm text-muted-foreground">Select a niche and generate an image to see it.</p>
               {/* Fallback placeholder for screen readers or if ImageOff fails */}
               <Image 
                src={`https://placehold.co/600x400.png`} 
                alt="Placeholder image before generation" 
                data-ai-hint={placeholderHint}
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" // Visually hidden but available
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
