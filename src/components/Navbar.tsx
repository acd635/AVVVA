import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Globe, ArrowRight, Heart } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onExploreClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAdmin,
  currentTab,
  setCurrentTab,
  onExploreClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    collections: lang === 'KA' ? 'კოლექციები' : 'Collections',
    certificates: lang === 'KA' ? 'სერტიფიკატები' : 'Certificates',
    about: lang === 'KA' ? 'ჩვენს შესახებ' : 'About AVA',
    contact: lang === 'KA' ? 'კონტაქტი' : 'Contact',
    tagline: lang === 'KA' ? 'ექსკლუზიური ძვირფასი ქვები' : 'FINE PRECIOUS GEMSTONES',
    heroTitleEN: 'NATURAL BEAUTY\nYOUR NATURAL CHOICE',
    heroTitleKA: 'ბუნებრივი სილამაზე\nშენი ბუნებრივი არჩევანი',
    subTextEN: 'Exquisite jewelry crafted with natural gemstones, hand-enameled roses, baroque pearls, and certified precious stones by master artisans',
    subTextKA: 'ბუნებრივი ქვებისა და ხელნაკეთი ოსტატობის სინთეზი, შექმნილი დახვეწილი გემოვნებისთვის',
    explore: lang === 'KA' ? 'შეარჩიე შენი სამკაული' : 'Choose Your Jewelry',
  };

  const navItems = [
    { id: 'collections', label: t.collections },
    { id: 'certificates', label: t.certificates },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);

    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const yOffset = -20;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 10);
  };

  return (
    <header className="relative z-50 w-full bg-transparent text-white transition-all pt-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch py-2 sm:py-3">
          
          {/* Left Column: Mobile menu + Logo at top, Hero Text + Button at bottom */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-8 sm:gap-10">
            {/* Top: Mobile Menu Toggle & AVA Logo centered on mobile */}
            <div className="flex items-center justify-between lg:justify-start gap-2 sm:gap-3 w-full">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-sky-300 transition-colors shrink-0 cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => {
                  setCurrentTab('collections');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center cursor-pointer group py-0 overflow-visible mx-auto lg:mx-0"
              >
                <img
                  src="https://i.postimg.cc/7P7GVBMx/Main-Logo-SVG-AVA.png"
                  alt="AVA Jewelry"
                  className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-2xl -mt-2 sm:-mt-4 lg:-ml-3"
                  referrerPolicy="no-referrer"
                />
              </button>

              {/* Spacer on mobile to maintain exact center alignment for logo */}
              <div className="w-10 lg:hidden" />
            </div>

            {/* Hero Text centered on mobile */}
            <div className="space-y-5 text-center lg:text-left my-auto py-2 -translate-y-2 sm:-translate-y-4 lg:-translate-y-6">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-montserrat font-light uppercase tracking-[0.12em] text-white drop-shadow-lg leading-tight whitespace-pre-line text-center lg:text-left">
                {lang === 'KA' ? t.heroTitleKA : t.heroTitleEN}
              </h1>
              <p className="text-slate-200 text-sm sm:text-lg font-inter font-normal leading-relaxed drop-shadow-md max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                {lang === 'KA' ? t.subTextKA : t.subTextEN}
              </p>
            </div>

            {/* Bottom: Explore Button centered on mobile */}
            {onExploreClick && (
              <div className="pt-1 pb-1 flex justify-center lg:justify-start">
                <button
                  onClick={onExploreClick}
                  className="px-8 py-3.5 bg-sky-400/05 backdrop-blur-sm border border-sky-300/20 hover:bg-white/15 hover:border-sky-300/40 text-white hover:text-sky-200 font-montserrat font-semibold text-xs uppercase tracking-[0.15em] rounded-2xl shadow-2xl transition-all duration-200 flex items-center gap-2 group cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>{t.explore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white group-hover:text-sky-200" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Light Blue Translucent Box stretching to match height of Left column with compact width */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-stretch items-center lg:items-end">
            <div className="bg-sky-400/05 backdrop-blur-sm border border-sky-300/20 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col items-center lg:items-end justify-between h-full w-full max-w-xs lg:max-w-[210px] mx-auto lg:ml-auto lg:mr-0 gap-6">
              
              {/* Top Row: Language, Wishlist, and Cart Icons Centered in the Box Header */}
              <div className="flex items-center justify-center gap-4 pb-2 w-full">
                {/* Language Switcher Icon */}
                <button
                  onClick={() => onLanguageChange(lang === 'KA' ? 'EN' : 'KA')}
                  className="p-2 text-white hover:text-sky-300 transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10"
                  title={lang === 'KA' ? 'Switch to English' : 'გადართე ქართულზე'}
                  aria-label="Language Switcher"
                >
                  <Globe className="w-5 h-5" />
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={onOpenWishlist}
                  className="p-2 text-white hover:text-sky-300 transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10 relative"
                  title={lang === 'KA' ? 'სურვილების სია' : 'Wishlist'}
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-sky-400 text-slate-950 text-[10px] font-montserrat font-bold rounded-full flex items-center justify-center shadow">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart Drawer Icon */}
                <button
                  onClick={onOpenCart}
                  className="p-2 text-white hover:text-sky-300 transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10 relative"
                  title={lang === 'KA' ? 'კალათა' : 'Shopping Cart'}
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-white text-slate-950 text-[10px] font-montserrat font-bold rounded-full flex items-center justify-center shadow">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Vertical Navigation Links */}
              <nav className="flex flex-col items-center lg:items-end gap-3.5 w-full my-auto">
                {navItems.map((item) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="text-sm sm:text-[15px] uppercase font-montserrat font-semibold tracking-[0.12em] py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer text-center lg:text-right w-full flex items-center justify-center lg:justify-end gap-2 group border border-transparent text-white hover:text-sky-300 hover:bg-white/15 hover:border-sky-300/40 hover:scale-[1.02]"
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Bottom empty spacer to ensure symmetric vertical padding */}
              <div className="hidden sm:block pb-1 w-full" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-md border-b border-sky-900/50 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-sm uppercase font-montserrat font-medium tracking-[0.1em] py-2 px-3 rounded-lg text-white hover:text-sky-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-white">
            <span>{t.tagline}</span>
            <a href="tel:+995322000000" className="text-white hover:text-sky-300 transition-colors">
              +995 32 200 00 00
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
