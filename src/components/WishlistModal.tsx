import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Language, Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  lang: Language;
  wishlistItems: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  lang,
  wishlistItems,
  onClose,
  onSelectProduct,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-slate-900 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-rose-500 font-serif font-bold text-xl">
              <Heart className="w-5 h-5 fill-current" />
              <span>{lang === 'KA' ? 'სურვილების სია' : 'Saved Favorites'}</span>
              <span className="text-xs bg-rose-50 px-2.5 py-0.5 rounded-full text-rose-700 font-sans border border-rose-200">
                {wishlistItems.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12 space-y-3 text-slate-500">
                <Heart className="w-12 h-12 mx-auto stroke-[1.2] text-slate-400" />
                <p className="text-sm">
                  {lang === 'KA' ? 'ჯერ არ გაქვთ შენახული სამკაულები' : 'No favorites saved yet'}
                </p>
              </div>
            ) : (
              wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 p-3.5 bg-[#FAF9F5] rounded-2xl border border-slate-200"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden"
                  >
                    <img
                      src={product.images.primary}
                      alt={product.titleEN}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-serif font-bold text-slate-900 line-clamp-1">
                        {lang === 'KA' ? product.titleKA : product.titleEN}
                      </h4>
                      <span className="text-[10px] text-sky-600 font-semibold block">
                        {product.purity}
                      </span>
                      <span className="text-sm font-serif font-bold text-slate-900">
                        ₾{product.priceGEL.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-sky-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{lang === 'KA' ? 'კალათაში' : 'Add'}</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
