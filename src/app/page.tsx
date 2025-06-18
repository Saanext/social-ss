import NicheImageApp from '@/components/NicheImageApp';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex flex-col items-center min-h-screen bg-background text-foreground">
      <header className="mb-10 sm:mb-12 md:mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-3 sm:mb-4">
          NicheImageAI
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-body max-w-2xl">
          Generate stunning, tailor-made visuals for your specific niche with the power of AI.
        </p>
      </header>
      <NicheImageApp />
    </main>
  );
}
