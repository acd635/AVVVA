import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Filter, Sparkles, Search, ShoppingBag, Heart, ShieldCheck, ArrowRight, ArrowUpDown, Globe } from 'lucide-react';
import { Language, Category, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Footer } from './Footer';
import { getProductTitle } from '../utils/translations';

interface CatalogPageProps {
  lang: Language;
  products: Product[];
  wishlist: Product[];
  cartCount: number;
  wishlistCount: number;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onBackToHome: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onLanguageChange: (lang: Language) => void;
  initialCategory?: Category;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  lang,
  products,
  wishlist,
  cartCount,
  wishlistCount,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onBackToHome,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAdmin,
  onLanguageChange,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-desc' | 'price-asc' | 'name-asc' | 'name-desc'>('default');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    { id: 'all', labelKA: 'ყველა ნამუშევარი', labelEN: 'All Creations', labelRU: 'Все изделия' },
    { id: 'rings', labelKA: 'ბეჭედი', labelEN: 'Rings', labelRU: 'Кольца' },
    { id: 'earrings', labelKA: 'საყურეები', labelEN: 'Earrings', labelRU: 'Серьги' },
    { id: 'necklaces', labelKA: 'ყელსაბამები', labelEN: 'Necklaces', labelRU: 'Колье' },
    { id: 'bracelets', labelKA: 'სამაჯური', labelEN: 'Bracelets', labelRU: 'Браслеты' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      let matchesCategory = false;
      if (selectedCategory === 'all') {
        matchesCategory = true;
      } else if (selectedCategory === 'rings') {
        matchesCategory = product.category === 'rings';
      } else if (selectedCategory === 'earrings') {
        matchesCategory = product.category === 'earrings';
      } else if (selectedCategory === 'necklaces') {
        matchesCategory = product.category === 'necklaces' || product.category === 'pendants';
      } else if (selectedCategory === 'bracelets') {
        matchesCategory = product.category === 'bracelets';
      } else if (selectedCategory === 'other') {
        matchesCategory =
          product.category === 'other' ||
          product.category === 'bracelets' ||
          product.category === 'sets' ||
          product.category === 'hats';
      } else {
        matchesCategory = product.category === selectedCategory;
      }

      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesTitle =
          (product.titleKA && product.titleKA.toLowerCase().includes(query)) ||
          (product.titleEN && product.titleEN.toLowerCase().includes(query)) ||
          (product.mainGemstone && product.mainGemstone.toLowerCase().includes(query)) ||
          (product.descriptionKA && product.descriptionKA.toLowerCase().includes(query)) ||
          (product.specifications?.gemstoneDetails && product.specifications.gemstoneDetails.toLowerCase().includes(query));
        return matchesCategory && matchesTitle;
      }

      return matchesCategory;
    });

    if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.priceGEL - a.priceGEL);
    } else if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.priceGEL - b.priceGEL);
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => {
        const titleA = getProductTitle(a, lang);
        const titleB = getProductTitle(b, lang);
        return titleA.localeCompare(titleB, lang === 'KA' ? 'ka' : lang === 'RU' ? 'ru' : 'en');
      });
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => {
        const titleA = getProductTitle(a, lang);
        const titleB = getProductTitle(b, lang);
        return titleB.localeCompare(titleA, lang === 'KA' ? 'ka' : lang === 'RU' ? 'ru' : 'en');
      });
    }

    return result;
  }, [products, selectedCategory, searchFilter, sortBy, lang]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200 selection:text-slate-900">
      
      {/* Top Header / Navigation Bar for Catalog Page */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-900 text-slate-700 hover:text-slate-900 font-montserrat font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center group cursor-pointer bg-white"
            >
              <span>{lang === 'KA' ? 'მთავარი გვერდი' : lang === 'RU' ? 'Главная' : 'Home'}</span>
            </button>
          </div>

          {/* Controls: 3-Language Selector, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 3-Language Selector */}
            <div className="flex items-center bg-white rounded-full p-0.5 border border-slate-200 shadow-sm">
              {(['KA', 'EN', 'RU'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageChange(l)}
                  className={`px-2 py-1 text-[11px] font-montserrat font-bold rounded-full transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-slate-900 text-sky-300 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={l === 'KA' ? 'ქართული' : l === 'RU' ? 'Русский' : 'English'}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={lang === 'KA' ? 'ძებნა' : lang === 'RU' ? 'Поиск' : 'Search'}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={lang === 'KA' ? 'სურვილების სია' : lang === 'RU' ? 'Список желаний' : 'Wishlist'}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2 rounded-full bg-slate-900 hover:bg-sky-600 text-white font-montserrat font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-sky-300" />
              <span>{lang === 'KA' ? 'კალათა' : lang === 'RU' ? 'Корзина' : 'Bag'}</span>
              {cartCount > 0 && (
                <span className="bg-sky-400 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Catalog Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 w-full flex-grow">
        
        {/* Page Banner / Title */}
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-montserrat font-light tracking-[0.08em] text-slate-900">
                {lang === 'KA' ? 'სამკაულების საცავი' : lang === 'RU' ? 'Сокровищница украшений' : 'The Jewelry Vault'}
              </h1>
            </div>

            <div className="text-slate-500 text-xs font-montserrat uppercase tracking-wider">
              {lang === 'KA'
                ? `სულ: ${filteredProducts.length} ნამუშევარი`
                : lang === 'RU'
                ? `Всего: ${filteredProducts.length} изделий`
                : `Total: ${filteredProducts.length} Items`}
            </div>
          </div>
        </div>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="space-y-4">
          
          {/* Quick Search Input aligned flush left */}
          <div className="relative max-w-md w-full">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={lang === 'KA' ? 'ძებნა კატალოგში...' : lang === 'RU' ? 'Поиск в каталоге...' : 'Search in catalog...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-inter focus:outline-none focus:border-sky-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Tabs & Sort Filter aligned inline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Category Tabs aligned flush left */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-montserrat font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-sky-300 border-slate-900 shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {lang === 'KA' ? cat.labelKA : lang === 'RU' ? cat.labelRU : cat.labelEN}
                </button>
              ))}
            </div>

            {/* Sort Filter Dropdown on the right side */}
            <div className="relative shrink-0 self-start md:self-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-9 pr-8 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-montserrat font-medium text-slate-700 focus:outline-none focus:border-sky-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="default">{lang === 'KA' ? 'სტანდარტული' : lang === 'RU' ? 'По умолчанию' : 'Standard'}</option>
                <option value="price-asc">{lang === 'KA' ? 'ფასი ზრდადი' : lang === 'RU' ? 'Сначала дешевле' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'KA' ? 'ფასი კლებადი' : lang === 'RU' ? 'Сначала дороже' : 'Price: High to Low'}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Product Cards Grid (Shows ALL items) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-montserrat text-slate-600">
              {products.length === 0
                ? (lang === 'KA'
                    ? 'კატალოგი ცარიელია. მზად არის ახალი პროდუქტების დასამატებლად.'
                    : lang === 'RU'
                    ? 'Каталог пуст. Готов к добавлению новых изделий.'
                    : 'The catalog is empty. Ready for new products to be added.')
                : (lang === 'KA'
                    ? 'ამ კატეგორიაში ნამუშევრები არ მოიძებნა'
                    : lang === 'RU'
                    ? 'В этой категории изделий не найдено'
                    : 'No items found in this category')}
            </p>
            {products.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchFilter('');
                }}
                className="px-4 py-2 text-xs font-montserrat text-sky-600 hover:underline uppercase tracking-wider"
              >
                {lang === 'KA' ? 'ფილტრის გასუფთავება' : lang === 'RU' ? 'Сбросить фильтры' : 'Reset Filters'}
              </button>
            )}
          </div>
        )}

        {/* Back to top & Return Home Bar */}
        <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 bg-slate-900 hover:bg-sky-600 text-white font-montserrat font-medium text-xs uppercase tracking-[0.15em] rounded-full shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'KA' ? 'დაბრუნება მთავარ გვერდზე' : lang === 'RU' ? 'Вернуться на главную' : 'Return to Home Page'}</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-montserrat font-medium text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors"
          >
            {lang === 'KA' ? '↑ ზევით დაბრუნება' : lang === 'RU' ? '↑ Наверх' : '↑ Back to Top'}
          </button>
        </div>

      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenAdmin={onOpenAdmin} />

    </div>
  );
};
