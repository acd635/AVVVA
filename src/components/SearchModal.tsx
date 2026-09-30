import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Gem } from 'lucide-react';
import { Language, Product } from '../types';
import { getProductTitle } from '../utils/translations';

interface SearchModalProps {
  isOpen: boolean;
  lang: Language;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  lang,
  products,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.titleKA.toLowerCase().includes(q) ||
          p.titleEN.toLowerCase().includes(q) ||
          (p.titleRU && p.titleRU.toLowerCase().includes(q)) ||
          getProductTitle(p, 'RU').toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.mainGemstone.toLowerCase().includes(q) ||
          p.metalType.toLowerCase().includes(q)
        );
      });

  const suggestions = [
    { labelKA: 'ვარდისფერი მინანქარი (Rose Enamel)', labelEN: 'Rose Enamel', labelRU: 'Розовая эмаль' },
    { labelKA: 'მზის კულონი (Sunburst)', labelEN: 'Sunburst Pendant', labelRU: 'Кулон Солнце' },
    { labelKA: 'ბრილიანტის ბეჭედი (Diamond Ring)', labelEN: 'Diamond Ring', labelRU: 'Кольцо с бриллиантом' },
    { labelKA: 'ზურმუხტი (Emerald)', labelEN: 'Emerald', labelRU: 'Изумруд' },
    { labelKA: 'მარგალიტი (Baroque Pearl)', labelEN: 'Baroque Pearl', labelRU: 'Барочный жемчуг' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 p-6 text-slate-900 shadow-2xl z-10 space-y-6"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-sky-600" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'KA' ? 'მოძებნეთ სამკაული, ძვირფასი თვალი, ქვები...' : lang === 'RU' ? 'Поиск украшений, камней, изделий...' : 'Search AVA jewelry, precious gemstones...'}
              className="w-full pl-12 pr-10 py-3.5 bg-[#FAF9F5] border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Instant Suggestions */}
          {query.trim() === '' && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {lang === 'KA' ? 'პოპულარული ძიება:' : lang === 'RU' ? 'Популярные запросы:' : 'Popular Searches:'}
              </span>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((item, idx) => {
                  const label = lang === 'KA' ? item.labelKA : lang === 'RU' ? item.labelRU : item.labelEN;
                  return (
                    <button
                      key={idx}
                      onClick={() => setQuery(label)}
                      className="px-3 py-1.5 bg-[#FAF9F5] hover:bg-sky-50 border border-slate-200 rounded-full text-xs text-sky-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-sky-600" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results */}
          {query.trim() !== '' && (
            <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
              {filtered.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">
                  {lang === 'KA' ? 'შედეგი ვერ მოიძებნა' : lang === 'RU' ? 'Ничего не найдено' : 'No matching AVA jewelry found'}
                </p>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-[#FAF9F5] hover:bg-sky-50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images.primary}
                        alt={getProductTitle(item, lang)}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="text-xs font-serif font-bold text-slate-900">
                          {getProductTitle(item, lang)}
                        </h4>
                        <span className="text-[10px] text-sky-600 font-semibold block">
                          {item.purity}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-serif font-bold text-slate-900">
                      ₾{item.priceGEL.toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
