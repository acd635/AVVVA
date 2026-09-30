import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShoppingBag, Heart, ShieldCheck, Check, Share2, Award, Gem, FileText, Truck } from 'lucide-react';
import { Language, Product } from '../types';
import { getProductTitle, getProductDescription } from '../utils/translations';

interface ProductModalProps {
  product: Product | null;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, ringSize?: string, engraving?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  lang,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('16.5 (53)');
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = [
    product.images.primary,
    ...(product.images.secondary ? [product.images.secondary] : []),
    ...(product.images.modelDisplay ? [product.images.modelDisplay] : []),
  ];

  const ringSizes = ['15.0 (47)', '15.5 (49)', '16.0 (51)', '16.5 (53)', '17.0 (55)', '17.5 (57)', '18.0 (59)'];

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, engravingText);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl text-slate-900 z-10 my-4"
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-100/90 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 p-4 sm:p-6">
            
            {/* Left: Product Image & Delivery Info */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-3">
              
              {/* Top part: Image Stage and reserved empty space for future additions */}
              <div className="space-y-3 flex-1 flex flex-col">
                {/* Main Image Stage */}
                <div className="relative aspect-square max-h-[300px] sm:max-h-[340px] w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-slate-200 shadow-sm group">
                  
                  <img
                    src={images[0]}
                    alt={product.titleEN}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=1000';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>

                {/* Reserved empty space under image */}
                <div className="flex-1 min-h-[20px]" />
              </div>

              {/* Free Delivery Box at Bottom aligned with right column actions */}
              <div className="bg-[#FAF9F5] p-3 rounded-lg border border-slate-200 flex items-center gap-2.5 shadow-sm mt-auto">
                <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-montserrat font-medium text-slate-800">
                  {lang === 'KA' ? 'უფასო მიწოდება თბილისის მასშტაბით' : lang === 'RU' ? 'Бесплатная доставка по Тбилиси' : 'Free delivery within Tbilisi'}
                </span>
              </div>

            </div>

            {/* Right: Specifications, Custom Engraving, Pricing & Cart */}
            <div className="md:col-span-7 space-y-3.5 flex flex-col justify-between">
              
              <div className="space-y-3">
                
                {/* Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-normal text-slate-900 pr-6">
                    {getProductTitle(product, lang)}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-2 border-b border-slate-100">
                  <span className="text-2xl font-montserrat font-medium text-slate-900">
                    ₾{product.priceGEL.toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs font-inter font-normal text-slate-600 leading-relaxed">
                  {getProductDescription(product, lang)}
                </p>

                {/* GIA / Authenticity Spec Grid */}
                <div className="bg-[#FAF9F5] p-3 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[11px] font-montserrat font-medium text-sky-700 uppercase tracking-[0.08em] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-sky-600" />
                    {lang === 'KA' ? 'სერტიფიკატის დეტალები' : lang === 'RU' ? 'СЕРТИФИКАТ ПОДЛИННОСТИ' : 'AUTHENTICITY CERTIFICATE'}
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-inter font-normal">
                    <div>
                      <span className="text-slate-500 text-[9px] font-montserrat font-light uppercase tracking-wider block">
                        {lang === 'KA' ? 'თვლების წონა' : lang === 'RU' ? 'Вставка / Камень' : 'Carat / Gemstone'}
                      </span>
                      <span className="font-medium text-slate-900">
                        {product.specifications.gemstoneDetails}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[9px] font-montserrat font-light uppercase tracking-wider block">
                        {lang === 'KA' ? 'ძვირფასი ქვები / ხარისხი' : lang === 'RU' ? 'Качество / Проба' : 'Gemstone Quality'}
                      </span>
                      <span className="font-medium text-slate-900">
                        {product.purity}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">
                        {lang === 'KA' ? 'სერტიფიკატის #' : lang === 'RU' ? 'Сертификат #' : 'Certificate #'}
                      </span>
                      <span className="font-mono text-sky-700 font-bold">
                        {product.specifications.certificateNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">
                        {lang === 'KA' ? 'წონა (გრამი)' : lang === 'RU' ? 'Вес (граммы)' : 'Total Weight'}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {product.specifications.weightGrams}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size Selection if Rings or Bracelets */}
                {(product.category === 'rings' || product.category === 'bracelets') && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800">
                        {lang === 'KA' ? 'აირჩიეთ ზომა:' : lang === 'RU' ? 'Выберите размер:' : 'Select Size:'}
                      </span>
                      <span className="text-sky-600 text-[10px] underline cursor-pointer">
                        {lang === 'KA' ? 'ზომების ცხრილი' : lang === 'RU' ? 'Таблица размеров' : 'Size Guide'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {ringSizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-slate-900 text-sky-300 border-slate-900 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Engraving Option */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-700 block">
                    {lang === 'KA' ? 'უფასო პერსონალური გრავიურა (არასავალდებულო):' : lang === 'RU' ? 'Бесплатная гравировка (по желанию):' : 'Free Custom Engraving (Optional):'}
                  </label>
                  <input
                    type="text"
                    maxLength={25}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder={lang === 'KA' ? 'მაგ: A & V • 2026' : lang === 'RU' ? 'напр: A & V • 2026' : 'e.g. Forever Yours • 2026'}
                    className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

              </div>

              {/* Actions & Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200">
                <div className="flex gap-2.5">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center bg-[#FAF9F5] border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer text-xs"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-sky-300 font-montserrat font-medium text-xs uppercase tracking-[0.08em] rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'KA' ? 'დაემატა კალათაში!' : lang === 'RU' ? 'Добавлено в корзину!' : 'Added to Bag!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{lang === 'KA' ? 'კალათაში დამატება' : lang === 'RU' ? 'В корзину' : 'Add to Shopping Bag'}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-[#FAF9F5] text-slate-600 border-slate-200 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {lang === 'KA' ? '100% უსაფრთხო შეკვეთა' : lang === 'RU' ? '100% безопасный заказ' : '100% Secure Insured Order'}
                  </span>
                  <span>
                    {lang === 'KA' ? 'მიწოდება 24 საათში' : lang === 'RU' ? 'Доставка за 24 часа' : '24h Delivery in Georgia'}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
