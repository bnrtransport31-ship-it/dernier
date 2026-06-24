import { NeonLine } from '@/components/NeonLine';

const TESTIMONIALS = [
  { text: 'Meilleur burger de nuit à Toulouse, je recommande !', author: 'Yanis' },
  { text: 'Livraison rapide et burger toujours chaud. L\'équipe est au top !', author: 'Sofiane' },
  { text: 'Le B.A.C Spécial est une tuerie. Viandes fraîches, pain maison.', author: 'Karim' },
  { text: 'Service de nuit impeccable. Enfin une livraison qualité après minuit !', author: 'Léa' },
  { text: 'Les frites cheesy B.A.C sont addictives...', author: 'Thomas' },
  { text: 'Brigade Anti-Creux = la solution quand tout est fermé. Merci l\'équipe !', author: 'Nadia' },
  { text: 'J\'ai testé le Night Stack, je n\'ai pas été déçu. ÉNORME !', author: 'Julien' },
  { text: 'Livraison à Balma en 20min, rapide et efficace.', author: 'Sarah' },
  { text: 'Enfin un service de livraison de qualité la nuit à Toulouse !', author: 'Mehdi' },
];

function TestimonialCard({ text, author }: { text: string; author: string }) {
  return (
    <span className="inline-flex items-center gap-4 px-6 shrink-0">
      <span className="font-inter text-lg text-white whitespace-nowrap">&ldquo;{text}&rdquo;</span>
      <span className="font-inter font-medium text-sm text-bac-gray whitespace-nowrap">— {author}</span>
      <span className="text-bac-blue font-inter text-lg">///</span>
    </span>
  );
}

export function TestimonialsSection() {
  // Duplicate for seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative bg-bac-blue-night py-10 overflow-hidden">
      <NeonLine />
      <div className="mt-8 group">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <TestimonialCard key={i} text={t.text} author={t.author} />
          ))}
        </div>
      </div>
      <NeonLine className="mt-8" />
    </section>
  );
}
