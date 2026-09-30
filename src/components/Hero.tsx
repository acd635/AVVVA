import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, Product } from '../types';

interface HeroProps {
  lang: Language;
  onExploreClick: () => void;
  onSelectProduct?: (product: Product) => void;
  signatureProducts?: Product[];
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  children,
}) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-start bg-[#020712] text-white overflow-hidden pb-8 border-b border-[#1A385E]">
      
      {/* Static Clean Hero Background Image without motion or blue blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-right bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000')`,
        }}
      />

      {/* Subtle Overlay to Ensure High Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80 pointer-events-none z-[1]" />

      {/* Top Navbar & Hero Content Grid Child */}
      <div className="relative z-40 w-full pointer-events-auto">
        {children}
      </div>
    </section>
  );
};



