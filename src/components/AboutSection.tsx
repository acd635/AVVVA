import React from 'react';
import { Sparkles, Gem, Award, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Brand Canvas */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3] bg-white group">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000"
              alt="AVA Atelier Craftsman"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-slate-950/50 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl space-y-1">
              <span className="text-[10px] font-montserrat font-medium uppercase tracking-[0.2em] text-sky-300 block">
                AVA JEWELRY
              </span>
              <p className="text-xs font-inter font-normal text-white leading-relaxed">
                {lang === 'KA'
                  ? '"ბუნებრივი სილამაზე შენი ბუნებრივი არჩევანი"'
                  : lang === 'RU'
                  ? '"Естественная красота — твой естественный выбор"'
                  : '"Natural Beauty, Your Natural Choice"'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Brand Story */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-montserrat font-light tracking-[0.08em] text-slate-900 leading-tight">
            {lang === 'KA'
              ? 'ბუნებრივი ქვებით შექმნილი სილამაზე დახვეწილი გემოვნებისთვის'
              : lang === 'RU'
              ? 'Красота натуральных камней для утонченного вкуса'
              : 'Enduring Elegance Crafted with Natural Gemstones'}
          </h2>

          <p className="text-slate-600 text-sm font-inter font-normal leading-relaxed">
            {lang === 'KA'
              ? 'AVA არის ქართული მაღალი საიუველირო ბრენდი, რომელიც სპეციალიზებულია ნატურალური ძვირფასი ქვებითა და ხელით მოხატული მინანქრით დამზადებულ სამკაულებზე. თითოეული მოდელი არის ექსკლუზიური, უნაკლო ბრწყინვალებისა და მაღალი ოსტატობის სინთეზი.'
              : lang === 'RU'
              ? 'AVA — грузинский ювелирный дом, создающий изысканные украшения из натуральных драгоценных камней и серебра. Каждое изделие — это синтез безупречного сияния, сертифицированного качества и ручного мастерства.'
              : 'AVA is a Georgian high jewelry house specializing in certified natural gemstones and hand-painted enamel creations. Each creation embodies flawless brilliance, certified quality, and bespoke craftsmanship.'}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-2xl font-montserrat font-light text-sky-600 block">100%</span>
              <span className="text-xs font-montserrat font-normal text-slate-900 block">
                {lang === 'KA' ? 'ნატურალური ქვები' : lang === 'RU' ? 'Натуральные камни' : 'Natural Gemstones'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-2xl font-montserrat font-light text-sky-600 block">GIA & IGI</span>
              <span className="text-xs font-montserrat font-normal text-slate-900 block">
                {lang === 'KA' ? 'ხარისხის გარანტია' : lang === 'RU' ? 'Гарантия качества' : 'Quality Certification'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
