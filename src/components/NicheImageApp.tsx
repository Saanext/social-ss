'use client';

import { useState } from 'react';
import { NICHES, type Niche } from '@/config/niches';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestPrompt, handleGenerateImage } from '@/lib/actions';

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
  const { toast } = useToast();

  const handleNicheSelect = (niche: Niche) => {
    setSelectedNiche(niche);
    setSuggestedPrompt(null);
    setGeneratedImageUrl(null);
    setUserPrompt('');
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
    
    link.download = `${filename}.png`; // Assuming AI generates PNG or browser can handle conversion
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const anyLoading = isLoadingImage || isLoadingSuggestion;

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
      />

      <GeneratedImage
        imageUrl={generatedImageUrl}
        altText={userPrompt || 'AI generated image'}
        isLoading={isLoadingImage}
        onDownload={handleDownloadImage}
        nicheName={selectedNiche?.name}
      />
    </div>
  );
}
