
'use client';

import { useState } from 'react';
import { NICHES, type Niche } from '@/config/niches';
import { IMAGE_STYLES, type ImageStyle } from '@/config/styles';
import { FONT_STYLE_OPTIONS, DEFAULT_FONT_STYLE_ID, type FontStyleOption } from '@/config/fonts';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateImage, handleGenerateHookContent, handleGenerateViralCaption } from '@/lib/actions'; 

import NicheSelector from './NicheSelector';
import PromptControls from './PromptControls';
import GeneratedImage from './GeneratedImage';
import ViralCaptionGenerator from './ViralCaptionGenerator';

export default function NicheImageApp() {
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  
  const [postIdea, setPostIdea] = useState('');
  const [hookText, setHookText] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle | null>(IMAGE_STYLES[0] || null);
  const [isLoadingHookContent, setIsLoadingHookContent] = useState(false);

  const [hookFontSize, setHookFontSize] = useState<number>(32);
  const [contentFontSize, setContentFontSize] = useState<number>(24);
  const [hookFontFamilyId, setHookFontFamilyId] = useState<string>(DEFAULT_FONT_STYLE_ID);
  const [contentFontFamilyId, setContentFontFamilyId] = useState<string>(DEFAULT_FONT_STYLE_ID);


  const [viralCaption, setViralCaption] = useState<string | null>(null);
  const [viralHashtags, setViralHashtags] = useState<string | null>(null);
  const [isLoadingCaption, setIsLoadingCaption] = useState(false);


  const { toast } = useToast();

  const handleNicheSelect = (niche: Niche) => {
    setSelectedNiche(niche);
    setGeneratedImageUrl(null); 
    setViralCaption(null); 
    setViralHashtags(null); 
    setPostIdea('');
    setHookText('');
    setContentText('');
  };

  const onGenerateHookContent = async () => {
    if (!postIdea || !selectedNiche) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please enter a post idea and select a niche to generate hook and content.' });
      return;
    }
    setIsLoadingHookContent(true);
    setHookText(''); 
    setContentText(''); 
    try {
      const result = await handleGenerateHookContent({ postIdea, niche: selectedNiche.name });
      setHookText(result.hook);
      setContentText(result.content);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error Generating Hook/Content', description: (error as Error).message });
    } finally {
      setIsLoadingHookContent(false);
    }
  };

  const onGenerateImage = async () => {
    if (!selectedNiche || !postIdea) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a niche and enter a post idea to generate an image.' });
      return;
    }
    setIsLoadingImage(true);
    setGeneratedImageUrl(null); 
    setViralCaption(null); 
    setViralHashtags(null); 

    const hookFont = FONT_STYLE_OPTIONS.find(f => f.id === hookFontFamilyId);
    const contentFont = FONT_STYLE_OPTIONS.find(f => f.id === contentFontFamilyId);

    try {
      const result = await handleGenerateImage({ 
        niche: selectedNiche.name, 
        postIdea: postIdea,
        imageStyleName: selectedStyle?.name,
        hookText: hookText,
        contentText: contentText,
        hookFontFamilyDescription: hookFont?.aiDescription,
        contentFontFamilyDescription: contentFont?.aiDescription,
      });
      setGeneratedImageUrl(result.imageUrl);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error Generating Image', description: (error as Error).message });
    } finally {
      setIsLoadingImage(false);
    }
  };

  const onGenerateViralCaptionSubmit = async () => {
    if (!selectedNiche || !postIdea) {
      toast({ variant: 'destructive', title: 'Context Missing', description: 'Cannot generate caption without niche and post idea.' });
      return;
    }
    setIsLoadingCaption(true);
    setViralCaption(null);
    setViralHashtags(null);
    try {
      const result = await handleGenerateViralCaption({
        postIdea,
        niche: selectedNiche.name,
        hookText,
        contentText,
        imageStyleName: selectedStyle?.name,
      });
      setViralCaption(result.viralCaption);
      setViralHashtags(result.viralHashtags);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error Generating Caption', description: (error as Error).message });
    } finally {
      setIsLoadingCaption(false);
    }
  };


  const handleDownloadImage = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    
    let filename = 'generated-image';
    if (postIdea) {
      filename = postIdea.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 50) || 'custom-image';
    } else if (selectedNiche) {
      filename = selectedNiche.name.toLowerCase().replace(/\s+/g, '-') + '-image';
    }
    
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const anyLoading = isLoadingImage || isLoadingHookContent || isLoadingCaption;
  const selectedHookFont = FONT_STYLE_OPTIONS.find(f => f.id === hookFontFamilyId) || FONT_STYLE_OPTIONS[0];
  const selectedContentFont = FONT_STYLE_OPTIONS.find(f => f.id === contentFontFamilyId) || FONT_STYLE_OPTIONS[0];

  return (
    <div className="w-full max-w-4xl space-y-8">
      <NicheSelector
        niches={NICHES}
        selectedNiche={selectedNiche}
        onNicheSelect={handleNicheSelect}
        disabled={anyLoading}
      />

      <PromptControls
        selectedNiche={selectedNiche}
        onGenerateImage={onGenerateImage}
        isLoadingImage={isLoadingImage}
        
        postIdea={postIdea}
        setPostIdea={setPostIdea}
        hookText={hookText}
        setHookText={setHookText}
        contentText={contentText}
        setContentText={setContentText}
        styles={IMAGE_STYLES}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        onGenerateHookContent={onGenerateHookContent}
        isLoadingHookContent={isLoadingHookContent}
        
        hookFontSize={hookFontSize}
        setHookFontSize={setHookFontSize}
        contentFontSize={contentFontSize}
        setContentFontSize={setContentFontSize}
        
        fontStyles={FONT_STYLE_OPTIONS}
        hookFontFamilyId={hookFontFamilyId}
        setHookFontFamilyId={setHookFontFamilyId}
        contentFontFamilyId={contentFontFamilyId}
        setContentFontFamilyId={setContentFontFamilyId}
      />

      <GeneratedImage
        imageUrl={generatedImageUrl}
        altText={postIdea || 'AI generated image based on post idea'}
        isLoading={isLoadingImage}
        onDownload={handleDownloadImage}
        nicheName={selectedNiche?.name}
        hookText={hookText}
        contentText={contentText}
        selectedStyleName={selectedStyle?.name || null}
        hookFontSize={hookFontSize}
        contentFontSize={contentFontSize}
        hookFontFamilyClass={selectedHookFont.cssClass}
        contentFontFamilyClass={selectedContentFont.cssClass}
      />

      {generatedImageUrl && !isLoadingImage && (
        <ViralCaptionGenerator
          onGenerate={onGenerateViralCaptionSubmit}
          caption={viralCaption}
          hashtags={viralHashtags}
          isLoading={isLoadingCaption}
          isDisabled={anyLoading && !isLoadingCaption} 
        />
      )}
    </div>
  );
}
