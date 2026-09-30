import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Language, Product } from '../types';
import { getProductTitle, getProductDescription } from '../utils/translations';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-sky-400 p-4 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Box */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F8F6F1] mb-4">
        
        {/* Main Product Image */}
        <img
          src={product.images.primary}
          alt={lang === 'KA' ? product.titleKA : product.titleEN}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000';
          }}
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
        />

        {/* Secondary Hover Image if available */}
        {product.images.secondary && (
          <img
            src={product.images.secondary}
            alt={product.titleEN}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=1000';
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Price Badge on Top Left of Photo */}
        <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 text-xs sm:text-sm font-montserrat font-medium text-slate-900 shadow-sm z-10">
          ₾{product.priceGEL.toLocaleString()}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md scale-110'
              : 'bg-white/80 text-slate-600 hover:text-rose-500 hover:bg-white border border-slate-200'
          }`}
          title={lang === 'KA' ? 'სურვილებში დამატება' : lang === 'RU' ? 'В избранное' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Reserved empty space after removing category and code labels */}
          <div className="h-4 mb-1" />

          <h3 className="font-montserrat font-medium text-sm sm:text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {getProductTitle(product, lang)}
          </h3>

          <p className="text-xs text-slate-600 font-inter font-normal leading-relaxed line-clamp-2 mt-1">
            {getProductDescription(product, lang)}
          </p>
        </div>

        {/* Action Button Centered */}
        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-center">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-montserrat font-medium uppercase tracking-[0.05em] transition-all flex items-center justify-center gap-1.5 ${
              added
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-900 hover:bg-slate-800 text-sky-300 shadow-md hover:shadow-sky-500/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'KA' ? 'დაემატა' : lang === 'RU' ? 'Добавлено' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{lang === 'KA' ? 'კალათაში დამატება' : lang === 'RU' ? 'В корзину' : 'Add to Bag'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
