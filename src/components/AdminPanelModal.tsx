import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Package,
  Image as ImageIcon,
  DollarSign,
  Sparkles,
  CheckCircle,
  Lock,
  Unlock,
  Eye,
  Tag,
  Layers,
  Link as LinkIcon,
  Copy,
  Check
} from 'lucide-react';
import { Product, Language, Category, GemstoneType, MetalType } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
}

const PRESET_IMAGES = [
  { name: 'Diamond Ring', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000' },
  { name: 'Emerald Bracelet', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000' },
  { name: 'Sapphire Ring', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1000' },
  { name: 'Pearl Earrings', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000' },
  { name: 'Ruby Pendant', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000' },
  { name: 'Diamond Bracelet', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000' },
];

const emptyProductForm = (): Omit<Product, 'id'> => ({
  titleKA: '',
  titleEN: '',
  category: 'rings',
  metalType: '18k-gold',
  mainGemstone: 'diamond',
  gemstoneCarat: '1.0 ct',
  purity: 'Fine Gemstone Setting',
  priceGEL: 2500,
  priceUSD: 920,
  rating: 5.0,
  reviewsCount: 1,
  isSignatureProduct: false,
  isNewRelease: true,
  isBestSeller: false,
  images: {
    primary: PRESET_IMAGES[0].url,
    secondary: PRESET_IMAGES[1].url,
    modelDisplay: PRESET_IMAGES[3].url,
  },
  descriptionKA: '',
  descriptionEN: '',
  specifications: {
    weightGrams: '12.5g',
    gemstoneDetails: 'Natural Gemstone with Diamond Accents',
    cutQuality: 'Excellent / Ideal',
    clarity: 'VVS1',
    certificateNumber: `AVA-GIA-${Math.floor(100000 + Math.random() * 900000)}`,
    hallmark: 'GIA Certified',
  },
});

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
}) => {
  const ADMIN_EMAIL = 'edproedpro31@gmail.com';
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Stored password management
  const [savedPassword, setSavedPassword] = useState(() => {
    return localStorage.getItem('ava_admin_password') || 'admin123';
  });
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProductForm());
  const [searchFilter, setSearchFilter] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const directUrl = `${window.location.origin}${window.location.pathname}#admin`;
    try {
      navigator.clipboard.writeText(directUrl);
    } catch (e) {
      console.error(e);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail !== ADMIN_EMAIL) {
      setLoginError(
        lang === 'KA'
          ? `წვდომა უარყოფილია: ელ-ფოსტა „${email}“ არ არის ადმინისტრატორი.`
          : `Access denied: "${email}" is not authorized as admin.`
      );
      return;
    }

    if (password !== savedPassword) {
      setLoginError(
        lang === 'KA'
          ? 'არასწორი პაროლი! გთხოვთ სცადოთ ხელახლა.'
          : 'Incorrect password! Please try again.'
      );
      return;
    }

    setIsAuthenticated(true);
    setLoginError(null);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 4) {
      alert(lang === 'KA' ? 'პაროლი უნდა იყოს მინიმუმ 4 სიმბოლო' : 'Password must be at least 4 characters');
      return;
    }
    localStorage.setItem('ava_admin_password', newPasswordInput);
    setSavedPassword(newPasswordInput);
    setNewPasswordInput('');
    setShowPasswordChange(false);
    setSuccessMsg(lang === 'KA' ? 'პაროლი წარმატებით შეიცვალა!' : 'Password changed successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setLoginError(null);
  };

  const handleStartAdd = () => {
    setEditingId(null);
    setFormData(emptyProductForm());
    setActiveTab('add');
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      titleKA: product.titleKA,
      titleEN: product.titleEN,
      category: product.category,
      metalType: product.metalType,
      mainGemstone: product.mainGemstone,
      gemstoneCarat: product.gemstoneCarat || '1.0 ct',
      purity: product.purity,
      priceGEL: product.priceGEL,
      priceUSD: product.priceUSD,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      isSignatureProduct: product.isSignatureProduct || false,
      isNewRelease: product.isNewRelease || false,
      isBestSeller: product.isBestSeller || false,
      images: { ...product.images },
      descriptionKA: product.descriptionKA,
      descriptionEN: product.descriptionEN,
      specifications: { ...product.specifications },
    });
    setActiveTab('add');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleKA || !formData.priceGEL) return;

    if (editingId) {
      const updated: Product = {
        id: editingId,
        ...formData,
      };
      onUpdateProduct(updated);
      setSuccessMsg(lang === 'KA' ? 'პროდუქტი წარმატებით განახლდა!' : 'Product updated successfully!');
    } else {
      const newProduct: Product = {
        id: `ava-custom-${Date.now()}`,
        ...formData,
      };
      onAddProduct(newProduct);
      setSuccessMsg(lang === 'KA' ? 'ახალი პროდუქტი წარმატებით დაემატა!' : 'New product added successfully!');
    }

    setTimeout(() => setSuccessMsg(null), 3000);
    setActiveTab('list');
    setEditingId(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.titleKA.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.titleEN.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF9F5] border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-2xl border border-sky-200">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <span>{lang === 'KA' ? 'AVA ადმინ პანელი' : 'AVA Admin Management'}</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ONLINE
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-light">
                {lang === 'KA' ? 'პროდუქტების დამატება, რედაქტირება და კატალოგის მართვა' : 'Add, edit and manage shop products inventory'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                copiedLink
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white hover:bg-slate-50 text-sky-700 border-slate-200'
              }`}
              title={lang === 'KA' ? 'პირდაპირი ლინკის კოპირება (#admin)' : 'Copy direct URL link (#admin)'}
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5 text-sky-600" />}
              <span>
                {copiedLink
                  ? (lang === 'KA' ? 'ლინკი დაკოპირდა!' : 'Link Copied!')
                  : (lang === 'KA' ? 'პირდაპირი ლინკი (#admin)' : 'Direct Link (#admin)')}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lock screen if login required */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto my-auto text-slate-900">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {lang === 'KA' ? 'ადმინისტრატორის ავტორიზაცია' : 'Admin Authorization'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'KA'
                  ? 'წვდომა შეზღუდულია. გთხოვთ შეიყვანოთ ადმინისტრატორის ელ-ფოსტა და პაროლი.'
                  : 'Access restricted to authorized store admin. Enter email & password.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'KA' ? 'ელ-ფოსტა' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="edproedpro31@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'KA' ? 'პაროლი' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono text-sm"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-sky-300 hover:bg-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'KA' ? 'ადმინ პანელში შესვლა' : 'Login to Admin Panel'}</span>
              </button>
            </form>

            <p className="text-[11px] text-slate-500 font-mono">
              {lang === 'KA' ? 'ნაგულისხმევი პაროლი:' : 'Default password:'} <span className="text-slate-700 font-bold">admin123</span>
            </p>
          </div>
        ) : (
          <>
            {/* Action Bar / Navigation Tabs */}
            <div className="px-6 py-3 bg-[#FAF9F5] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'list'
                      ? 'bg-slate-900 text-sky-300 shadow-md font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{lang === 'KA' ? `პროდუქტები (${products.length})` : `Products (${products.length})`}</span>
                </button>

                <button
                  onClick={handleStartAdd}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'add' && !editingId
                      ? 'bg-emerald-600 text-white shadow-md font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'KA' ? '+ პროდუქტის დამატება' : '+ Add New Product'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {successMsg && (
                  <span className="text-xs text-emerald-400 font-medium animate-pulse flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {successMsg}
                  </span>
                )}

                <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C223E] border border-[#1E416C] text-[11px] text-slate-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{ADMIN_EMAIL}</span>
                </div>

                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-amber-300 hover:bg-[#122F54] rounded-xl transition-colors cursor-pointer border border-[#1C3E68]"
                  title={lang === 'KA' ? 'პაროლის შეცვლა' : 'Change Password'}
                >
                  {lang === 'KA' ? 'პაროლის შეცვლა' : 'Change Password'}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-500/30"
                  title={lang === 'KA' ? 'გამოსვლა' : 'Logout'}
                >
                  {lang === 'KA' ? 'გამოსვლა' : 'Logout'}
                </button>
              </div>
            </div>

            {/* Password Change Sub-bar */}
            {showPasswordChange && (
              <form onSubmit={handleChangePassword} className="px-6 py-3 bg-[#0A2240] border-b border-[#1E416C] flex items-center gap-3 text-xs">
                <span className="text-amber-300 font-semibold">{lang === 'KA' ? 'ახალი პაროლი:' : 'New Password:'}</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="px-3 py-1.5 bg-[#051324] border border-[#1C3E68] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 cursor-pointer"
                >
                  {lang === 'KA' ? 'შენახვა' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  {lang === 'KA' ? 'გაუქმება' : 'Cancel'}
                </button>
              </form>
            )}

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: PRODUCT LIST */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  {/* Search Filter */}
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      placeholder={lang === 'KA' ? 'ძიება პროდუქტის დასახელებით...' : 'Search product title or ID...'}
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="px-4 py-2.5 bg-[#091D36] border border-[#1E416C] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-full max-w-xs"
                    />
                    <span className="text-xs text-slate-400">
                      {lang === 'KA' ? `სულ: ${filteredProducts.length} მოდელი` : `Total: ${filteredProducts.length} items`}
                    </span>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 bg-[#091D36] border border-[#1C3E68] rounded-2xl flex items-center justify-between gap-4 hover:border-amber-500/40 transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.images.primary}
                            alt={p.titleKA}
                            className="w-16 h-16 object-cover rounded-xl border border-[#234E80] shrink-0 bg-slate-900"
                          />
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                {p.category}
                              </span>
                              <span className="text-[10px] text-slate-400 capitalize">
                                {p.mainGemstone}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-100 truncate">
                              {lang === 'KA' ? p.titleKA : p.titleEN}
                            </h4>
                            <p className="text-xs font-serif text-amber-300 font-bold">
                              ₾{p.priceGEL.toLocaleString()} <span className="text-[10px] text-slate-400 font-mono">(${p.priceUSD})</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-2 text-slate-300 hover:text-amber-300 hover:bg-[#122F54] rounded-lg transition-colors cursor-pointer"
                            title={lang === 'KA' ? 'რედაქტირება' : 'Edit'}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(lang === 'KA' ? `დარწმუნებული ხართ რომ გსურთ „${p.titleKA}“-ს წაშლა?` : `Delete "${p.titleEN}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                            title={lang === 'KA' ? 'წაშლა' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      {lang === 'KA' ? 'პროდუქტები ვერ მოიძებნა' : 'No products found'}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ADD / EDIT PRODUCT FORM */}
              {activeTab === 'add' && (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1C3E68]">
                    <h3 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>
                        {editingId
                          ? (lang === 'KA' ? 'პროდუქტის რედაქტირება' : 'Edit Product')
                          : (lang === 'KA' ? 'ახალი პროდუქტის დამატება' : 'Create New Product')}
                      </span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      {lang === 'KA' ? 'გაუქმება' : 'Cancel'}
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'სათაური (ქართულად)' : 'Title (Georgian)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.titleKA}
                        onChange={(e) => setFormData({ ...formData, titleKA: e.target.value })}
                        placeholder="მაგ: AVA ბრილიანტის ექსკლუზიური ბეჭდი"
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'სათაური (ინგლისურად)' : 'Title (English)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.titleEN}
                        onChange={(e) => setFormData({ ...formData, titleEN: e.target.value })}
                        placeholder="e.g. AVA Solstice Diamond Ring"
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Pricing and Category */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'ფასი (GEL ₾)' : 'Price GEL (₾)'} *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.priceGEL}
                        onChange={(e) => {
                          const gel = Number(e.target.value);
                          setFormData({
                            ...formData,
                            priceGEL: gel,
                            priceUSD: Math.round(gel / 2.7), // auto approximate USD
                          });
                        }}
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'ფასი (USD $)' : 'Price USD ($)'}
                      </label>
                      <input
                        type="number"
                        value={formData.priceUSD}
                        onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'კატეგორია' : 'Category'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="earrings">საყურე (Earrings)</option>
                        <option value="necklaces">ყელსაბამი (Necklace)</option>
                        <option value="hats">ქუდი (Hat)</option>
                        <option value="other">სხვა (Other)</option>
                        <option value="rings">ბეჭდები (Rings)</option>
                        <option value="bracelets">სამაჯურები (Bracelets)</option>
                        <option value="pendants">კულონები (Pendants)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'მთავარი ძვირფასი თვალი' : 'Main Gemstone'}
                      </label>
                      <select
                        value={formData.mainGemstone}
                        onChange={(e) => setFormData({ ...formData, mainGemstone: e.target.value as GemstoneType })}
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="diamond">ბრილიანტი (Diamond)</option>
                        <option value="emerald">ზურმუხტი (Emerald)</option>
                        <option value="sapphire">საფირონი (Sapphire)</option>
                        <option value="ruby">ლალი (Ruby)</option>
                        <option value="pearl">მარგალიტი (Pearl)</option>
                        <option value="enamel">მინანქარი (Enamel)</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URLs & Presets */}
                  <div className="space-y-3 bg-[#081B33] p-4 rounded-2xl border border-[#183861]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{lang === 'KA' ? 'ფოტოების ბმულები (URLs)' : 'Image URLs'}</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {lang === 'KA' ? 'აირჩიეთ მზა შაბლონი ან ჩასვით ბმული' : 'Pick a preset or enter URL'}
                      </span>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              images: { ...formData.images, primary: preset.url },
                            })
                          }
                          className="px-2.5 py-1 text-[11px] bg-[#0E2C52] hover:bg-[#163C6D] border border-[#234E80] text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <img src={preset.url} className="w-3.5 h-3.5 rounded object-cover" />
                          <span>{preset.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <span className="text-[11px] text-slate-400">{lang === 'KA' ? 'მთავარი ფოტო URL' : 'Primary Image URL'}</span>
                        <input
                          type="url"
                          required
                          value={formData.images.primary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              images: { ...formData.images, primary: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#051324] border border-[#1C3E68] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] text-slate-400">{lang === 'KA' ? 'მეორადი ფოტო URL' : 'Secondary Image URL'}</span>
                        <input
                          type="url"
                          value={formData.images.secondary || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              images: { ...formData.images, secondary: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#051324] border border-[#1C3E68] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'აღწერა (ქართულად)' : 'Description (Georgian)'}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.descriptionKA}
                        onChange={(e) => setFormData({ ...formData, descriptionKA: e.target.value })}
                        placeholder="ექსკლუზიური ხელნაკეთი სამკაული..."
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {lang === 'KA' ? 'აღწერა (ინგლისურად)' : 'Description (English)'}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.descriptionEN}
                        onChange={(e) => setFormData({ ...formData, descriptionEN: e.target.value })}
                        placeholder="Exquisite handcrafted fine jewelry piece..."
                        className="w-full px-3.5 py-2.5 bg-[#091D36] border border-[#1C3E68] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Badges / Highlights */}
                  <div className="flex flex-wrap items-center gap-6 p-4 bg-[#081B33] rounded-2xl border border-[#183861]">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.isSignatureProduct}
                        onChange={(e) => setFormData({ ...formData, isSignatureProduct: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span>{lang === 'KA' ? 'AVA-ს ექსკლუზივი (Signature)' : 'AVA Signature Collection'}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.isNewRelease}
                        onChange={(e) => setFormData({ ...formData, isNewRelease: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span>{lang === 'KA' ? 'ახალი კოლექცია (New Release)' : 'New Release Badge'}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span>{lang === 'KA' ? 'ბესტსელერი (Best Seller)' : 'Bestseller Tag'}</span>
                    </label>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C3E68]">
                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="px-5 py-2.5 text-xs text-slate-300 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer"
                    >
                      {lang === 'KA' ? 'გაუქმება' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>
                        {editingId
                          ? (lang === 'KA' ? 'ცვლილებების შენახვა' : 'Save Changes')
                          : (lang === 'KA' ? 'პროდუქტის გამოქვეყნება' : 'Publish Product')}
                      </span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
