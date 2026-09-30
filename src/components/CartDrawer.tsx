import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift, CheckCircle2, Sparkles, CreditCard, Truck } from 'lucide-react';
import { Language, CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  lang: Language;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  lang,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('თბილისი (Tbilisi)');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'tbc' | 'bog' | 'transfer'>('card');

  if (!isOpen) return null;

  const subtotalGEL = cartItems.reduce((acc, item) => acc + item.product.priceGEL * item.quantity, 0);
  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const discountAmountGEL = discountApplied ? Math.round(subtotalGEL * 0.1) : 0;
  const finalTotalGEL = subtotalGEL - discountAmountGEL;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AVA2026') {
      setDiscountApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white text-slate-900 shadow-2xl border-l border-slate-200 flex flex-col justify-between"
          >
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-montserrat font-normal text-slate-900">
                  {lang === 'KA' ? 'საყიდლების კალათა' : 'Shopping Bag'}
                </h2>
                <span className="text-xs bg-sky-100 px-2.5 py-0.5 rounded-full text-sky-800 font-montserrat font-medium border border-sky-200">
                  {cartItems.length}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            {orderComplete ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  {lang === 'KA' ? 'შეკვეთა მიღებულია!' : 'Order Confirmed!'}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'KA'
                    ? `გმადლობთ შეკვეთისთვის. შეკვეთის ინვოისი #AVA-${Math.floor(100000 + Math.random() * 900000)} გაიგზავნა მითითებულ ნომერზე. კურიერი დაგიკავშირდებათ.`
                    : `Thank you for your order. Your invoice #AVA-${Math.floor(100000 + Math.random() * 900000)} is processed. Free insured courier delivery is dispatched.`}
                </p>

                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-slate-200 text-left w-full space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{lang === 'KA' ? 'მიწოდების მისამართი:' : 'Address:'}</span>
                    <span className="font-bold text-slate-900">{city}, {address}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{lang === 'KA' ? 'სულ გადასახდელი:' : 'Total Paid:'}</span>
                    <span className="font-bold text-sky-600">₾{finalTotalGEL.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setShowCheckout(false);
                    onClose();
                  }}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-sky-300 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg"
                >
                  {lang === 'KA' ? 'საიტზე დაბრუნება' : 'Back to Store'}
                </button>
              </div>
            ) : showCheckout ? (
              /* Checkout View */
              <form onSubmit={handlePlaceOrder} className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
                    {lang === 'KA' ? 'გაფორმება & მიწოდება' : 'Delivery & Payment'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    {lang === 'KA' ? 'კალათაში დაბრუნება' : 'Edit Bag'}
                  </button>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'KA' ? 'სახელი და გვარი *' : 'Full Name *'}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                  />

                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'KA' ? 'ტელეფონის ნომერი *' : 'Phone Number *'}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                  />

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-400"
                  >
                    <option value="თბილისი (Tbilisi)">თბილისი (Tbilisi)</option>
                    <option value="ბათუმი (Batumi)">ბათუმი (Batumi)</option>
                    <option value="ქუთაისი (Kutaisi)">ქუთაისი (Kutaisi)</option>
                    <option value="რუსთავი (Rustavi)">რუსთავი (Rustavi)</option>
                    <option value="საერთაშორისო მიწოდება (Worldwide)">Worldwide Insured Express</option>
                  </select>

                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === 'KA' ? 'ქუჩა, ბინა, კორპუსი *' : 'Street Address, Apartment *'}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Payment Options */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'KA' ? 'გადახდის მეთოდი:' : 'Payment Method:'}
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-[#FAF9F5] border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      💳 {lang === 'KA' ? 'საბანკო ბარათი' : 'Credit Card'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('tbc')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        paymentMethod === 'tbc'
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-[#FAF9F5] border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🏦 TBC Pay / ონლაინ
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bog')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        paymentMethod === 'bog'
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-[#FAF9F5] border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🏛️ BOG Pay
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        paymentMethod === 'transfer'
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-[#FAF9F5] border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      📄 {lang === 'KA' ? 'საბანკო გადარიცხვა' : 'Bank Transfer'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-sky-200 font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all"
                  >
                    {lang === 'KA' ? `გადახდა: ₾${finalTotalGEL.toLocaleString()}` : `Confirm & Pay ₾${finalTotalGEL.toLocaleString()}`}
                  </button>
                </div>
              </form>
            ) : (
              /* Cart Items List */
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                    <ShoppingBag className="w-12 h-12 text-slate-400 stroke-[1.5]" />
                    <p className="text-sm font-light text-slate-600">
                      {lang === 'KA' ? 'თქვენი კალათა ცარიელია' : 'Your shopping bag is currently empty'}
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-sky-200 font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md"
                    >
                      {lang === 'KA' ? 'კოლექციის დათვალიერება' : 'Explore Collections'}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-3 bg-[#FAF9F5] rounded-2xl border border-slate-200 relative group"
                        >
                          <img
                            src={item.product.images.primary}
                            alt={item.product.titleEN}
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 object-cover rounded-xl shrink-0 border border-slate-200"
                          />

                          <div className="flex-1 space-y-1">
                            <h4 className="text-xs font-montserrat font-normal text-slate-900 line-clamp-1">
                              {lang === 'KA' ? item.product.titleKA : item.product.titleEN}
                            </h4>

                            <span className="text-[10px] text-sky-700 font-montserrat font-light tracking-wider uppercase block">
                              {item.product.purity}
                            </span>

                            {item.selectedRingSize && (
                              <span className="text-[10px] font-inter font-normal text-slate-500 block">
                                {lang === 'KA' ? 'ზომა:' : 'Size:'} {item.selectedRingSize}
                              </span>
                            )}

                            {item.customEngraving && (
                              <span className="text-[10px] font-inter font-normal text-slate-600 italic block">
                                "{item.customEngraving}"
                              </span>
                            )}

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-sm font-montserrat font-normal text-slate-900">
                                ₾{(item.product.priceGEL * item.quantity).toLocaleString()}
                              </span>

                              {/* Quantity controls */}
                              <div className="flex items-center bg-white rounded-lg border border-slate-200">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 font-bold"
                                >
                                  -
                                </button>
                                <span className="px-2 text-xs font-bold text-slate-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Complimentary Packaging Option */}
                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-sky-600 shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-900 block">
                            {lang === 'KA' ? 'AVA-ს ხავერდის სასაჩუქრე შეფუთვა' : 'Signature Velvet Gift Box'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {lang === 'KA' ? 'მუქი ლურჯი ხავერდის ყუთი & ჩანთა (უფასო)' : 'Complimentary Dark Blue Velvet Box & Ribbon'}
                          </span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={includeGiftWrap}
                        onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                        className="w-4 h-4 accent-sky-600 cursor-pointer"
                      />
                    </div>

                    {/* Promo Code Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={lang === 'KA' ? 'პრომო კოდი (მაგ: AVA2026)' : 'Promo Code (e.g. AVA2026)'}
                        className="flex-1 px-3 py-2 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 uppercase placeholder-slate-400 focus:outline-none focus:border-sky-400"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-sky-200 font-bold text-xs rounded-xl shadow-sm"
                      >
                        {discountApplied ? '✓ 10%' : (lang === 'KA' ? 'გამოყენება' : 'Apply')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Footer Total & Checkout CTA */}
            {cartItems.length > 0 && !orderComplete && !showCheckout && (
              <div className="p-6 bg-[#FAF9F5] border-t border-slate-200 space-y-4">
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{lang === 'KA' ? 'ჯამი:' : 'Subtotal:'}</span>
                    <span>₾{subtotalGEL.toLocaleString()}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>{lang === 'KA' ? 'პრომო ფასდაკლება 10%:' : 'Discount (10%):'}</span>
                      <span>-₾{discountAmountGEL.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>{lang === 'KA' ? 'დაზღვეული მიწოდება:' : 'Insured Courier Delivery:'}</span>
                    <span className="text-emerald-600 font-bold">
                      {lang === 'KA' ? 'უფასო (FREE)' : 'FREE'}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-montserrat font-normal text-slate-900 pt-2 border-t border-slate-200">
                    <span>{lang === 'KA' ? 'სულ გადასახდელი:' : 'Total Amount:'}</span>
                    <span>₾{finalTotalGEL.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-sky-200 font-montserrat font-medium text-xs uppercase tracking-[0.1em] rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{lang === 'KA' ? 'შეკვეთის გაფორმება' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'KA' ? 'ძვირფასი ქვების სერტიფიკატი & საგარანტიო ტალონი' : 'Gemstone Certificate & Warranty Included'}</span>
                </div>

              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
};
