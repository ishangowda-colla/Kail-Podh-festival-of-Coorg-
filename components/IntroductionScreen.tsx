
import React from 'react';

interface IntroductionScreenProps {
  onExplore: () => void;
}

// FIX: Made the 'children' prop optional to resolve a TypeScript error.
const Card = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200/50">
    <h2 className="text-2xl font-bold text-amber-900 mb-4">{title}</h2>
    {children}
  </div>
);

const HighlightItem = ({ icon, text }: { icon: string, text: string }) => (
  <li className="flex items-start space-x-3">
    <span className="text-xl">{icon}</span>
    <span className="text-amber-800">{text}</span>
  </li>
);

export const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ onExplore }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-100 to-orange-200 p-4 sm:p-8 flex flex-col items-center">
      <main className="max-w-4xl w-full mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 tracking-tight">
            👉 Kail Podh: The Warrior Spirit of Coorg 🐘⚔️
          </h1>
        </header>

        <Card title="Welcome to Kail Podh!">
          <p className="text-amber-800 leading-relaxed">
            Welcome to the vibrant Kodava festival that honors the warrior heritage, hunting traditions, and deep connection with nature in the hills of Coorg (Kodagu).
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="What is Kail Podh?">
            <p className="text-amber-800 leading-relaxed">
              Kail Podh, meaning “Festival of Arms,” is a traditional Kodava celebration held in early September. It marks the end of the paddy sowing season and the beginning of the hunting season — a time when weapons are cleaned, worshipped, and displayed with pride.
            </p>
          </Card>
          <Card title="Why Coorg?">
            <p className="text-amber-800 leading-relaxed">
              Known as the “Scotland of India,” Coorg is home to the Kodava people — a unique martial community with a rich legacy of valor, nature worship, and cultural pride. Kail Podh reflects their deep-rooted customs, reverence for arms, and harmony with the forested landscape.
            </p>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <img src="https://picsum.photos/seed/kailpodh1/600/400" alt="Kodava men in traditional attire" className="rounded-lg shadow-md object-cover h-64 w-full" />
          <img src="https://picsum.photos/seed/kailpodh2/600/400" alt="Families performing Kail Podh rituals" className="rounded-lg shadow-md object-cover h-64 w-full" />
          <img src="https://picsum.photos/seed/kailpodh3/600/400" alt="Festive gatherings with food" className="rounded-lg shadow-md object-cover h-64 w-full" />
        </div>

        <Card title="Key Highlights">
          <ul className="space-y-3">
            <HighlightItem icon="✅" text="Weapon Worship & Family Rituals" />
            <HighlightItem icon="✅" text="Traditional Kodava Attire & Dance" />
            <HighlightItem icon="✅" text="Feasting on Wild Game-Inspired Cuisine" />
            <HighlightItem icon="✅" text="Community Gatherings & Storytelling" />
            <HighlightItem icon="✅" text="Honoring Nature & Ancestral Spirits" />
          </ul>
          <p className="text-sm text-amber-700 mt-4">These traditions preserve the Kodava identity and celebrate their enduring bond with land, legacy, and valor.</p>
        </Card>

        <div className="text-center pt-4">
          <button
            onClick={onExplore}
            className="bg-amber-800 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-900 transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500"
          >
            Explore Kail Podh Traditions ➡
          </button>
        </div>
      </main>
    </div>
  );
};
