
'use client';

import { useState } from 'react';
import { NICHES, type Niche } from '@/config/niches';
import { IMAGE_STYLES, type ImageStyle } from '@/config/styles';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestPrompt, handleGenerateImage, handleGenerateHookContent } from '@/lib/actions';

import NicheSelector from './NicheSelector';
import PromptControls from './PromptControls';
import GeneratedImage from './GeneratedImage';

export default function NicheImageApp() {
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [suggestedPrompt, setSuggestedPrompt] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  
  const [postIdea, setPostIdea] = useState('');
  const [hookText, setHookText] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle | null>(IMAGE_STYLES[0] || null);
  const [isLoadingHookContent, setIsLoadingHookContent] = useState(false);


  const { toast } = useToast();

  const handleNicheSelect = (niche: Niche) => {
    setSelectedNiche(niche);
    setSuggestedPrompt(null);
    setGeneratedImageUrl(null);
    setUserPrompt('');
    setPostIdea('');
    setHookText('');
    setContentText('');
  };

  const onSuggestPrompt = async () => {
    if (!selectedNiche) return;
    setIsLoadingSuggestion(true);
    setSuggestedPrompt(null);
    try {
      const result = await handleSuggestPrompt({ niche: selectedNiche.name });
      setSuggestedPrompt(result.promptSuggestion);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error Suggesting Prompt', description: (error as Error).message });
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const onGenerateHookContent = async () => {
    if (!postIdea || !selectedNiche) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please enter a post idea and select a niche to generate hook and content.' });
      return;
    }
    setIsLoadingHookContent(true);
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
    if (!selectedNiche || !userPrompt) return;
    setIsLoadingImage(true);
    setGeneratedImageUrl(null);
    try {
      const result = await handleGenerateImage({ niche: selectedNiche.name, prompt: userPrompt });
      setGeneratedImageUrl(result.imageUrl);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error Generating Image', description: (error as Error).message });
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    
    let filename = 'generated-image';
    if (userPrompt) {
      filename = userPrompt.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 50) || 'custom-image';
    } else if (selectedNiche) {
      filename = selectedNiche.name.toLowerCase().replace(/\s+/g, '-') + '-image';
    }
    
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const anyLoading = isLoadingImage || isLoadingSuggestion || isLoadingHookContent;

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
        userPrompt={userPrompt}
        setUserPrompt={setUserPrompt}
        suggestedPrompt={suggestedPrompt}
        onSuggestPrompt={onSuggestPrompt}
        onGenerateImage={onGenerateImage}
        isLoadingSuggestion={isLoadingSuggestion}
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
      />

      <GeneratedImage
        imageUrl={generatedImageUrl}
        altText={userPrompt || 'AI generated image'}
        isLoading={isLoadingImage}
        onDownload={handleDownloadImage}
        nicheName={selectedNiche?.name}
        hookText={hookText}
        contentText={contentText}
        selectedStyleName={selectedStyle?.name || null}
      />
    </div>
  );
}
