'use client';

import type { Niche } from '@/config/niches';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NicheSelectorProps {
  niches: Niche[];
  selectedNiche: Niche | null;
  onNicheSelect: (niche: Niche) => void;
  disabled?: boolean;
}

export default function NicheSelector({ niches, selectedNiche, onNicheSelect, disabled }: NicheSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {niches.map((niche) => {
        const IconComponent = niche.icon;
        return (
          <Card
            key={niche.id}
            onClick={() => !disabled && onNicheSelect(niche)}
            className={cn(
              'cursor-pointer transition-all duration-200 ease-in-out hover:shadow-xl transform hover:-translate-y-1',
              selectedNiche?.id === niche.id
                ? 'ring-2 ring-primary shadow-2xl bg-primary/10'
                : 'bg-card',
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            aria-pressed={selectedNiche?.id === niche.id}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onNicheSelect(niche);
              }
            }}
          >
            <CardHeader className="items-center text-center">
              <IconComponent className="w-12 h-12 mb-3 text-primary" />
              <CardTitle className="font-headline text-xl">{niche.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{niche.description}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
