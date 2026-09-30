import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CertificatesSection } from './components/CertificatesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CatalogPage } from './components/CatalogPage';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { Language, Category, GemstoneType, Product, CartItem } from './types';
import { Sparkles, Filter, Gem, Check, ArrowRight } from 'lucide-react';
import { getProductTitle } from './utils/translations';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ava_lang');
      if (saved === 'KA' || saved === 'EN' || saved === 'RU') return saved;
    } catch (e) {}
    return 'KA';
  });
  const [currentTab, setCurrentTab] = useState('collections');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ava_lang', lang);
    } catch (e) {}
  }, [lang]);

  // Dynamic Products State initialized directly from PRODUCTS to ensure instant updates
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy caches to prevent stale data
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ava_products')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clean initial hash if present so site always opens on homepage, but listen for hashchange
  useEffect(() => {
    // If page loaded with #admin in URL, clear it so site opens cleanly on homepage
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      history.replaceState('', document.title, window.location.pathname + window.location.search);
    }

    const onHashChange = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
        setAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleOpenAdmin = () => {
    setAdminOpen(true);
    window.location.hash = 'admin';
  };

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin Handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(
      lang === 'KA'
        ? `„${newProduct.titleKA}“ წარმატებით დაემატა!`
        : lang === 'RU'
        ? `«${getProductTitle(newProduct, 'RU')}» успешно добавлено!`
        : `Added "${newProduct.titleEN}" to catalog!`
    );
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(
      lang === 'KA' ? 'პროდუქტის ინფორმაცია განახლდა' : lang === 'RU' ? 'Информация о товаре обновлена' : 'Product updated'
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(lang === 'KA' ? 'პროდუქტი წაიშალა' : lang === 'RU' ? 'Товар удален' : 'Product deleted');
  };

  const handleResetProducts = () => {
    setProducts(PRODUCTS);
    showToast(lang === 'KA' ? 'კატალოგი აღდგა საწყისზე' : lang === 'RU' ? 'Каталог сброшен к исходному' : 'Catalog reset to default');
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    ringSize?: string,
    engraving?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedRingSize: ringSize,
          customEngraving: engraving,
        },
      ];
    });
    showToast(
      lang === 'KA'
        ? `„${product.titleKA}“ დაემატა კალათაში`
        : lang === 'RU'
        ? `«${getProductTitle(product, 'RU')}» добавлено в корзину`
        : `Added "${product.titleEN}" to your shopping bag`
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(
          lang === 'KA'
            ? 'ამოიღეს სურვილების სიიდან'
            : lang === 'RU'
            ? 'Удалено из списка желаний'
            : 'Removed from saved favorites'
        );
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(
          lang === 'KA'
            ? 'შენახულია სურვილების სიაში'
            : lang === 'RU'
            ? 'Сохранено в список желаний'
            : 'Saved to your favorites'
        );
        return [...prev, product];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
        matchesCategory = product.category === 'other' || product.category === 'bracelets' || product.category === 'sets' || product.category === 'hats';
      } else {
        matchesCategory = product.category === selectedCategory;
      }

      return matchesCategory;
    });
  }, [products, selectedCategory]);

  // Displayed products on home page: exactly 8 shuffled for 'all', exactly 4 for specific categories
  const displayedHomeProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      // Deterministic shuffle across all products to display 8 items mixed/shuffled ("არეულად")
      const arr = [...products];
      let seed = 42;
      for (let i = arr.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const j = Math.floor((seed / 233280) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.slice(0, 8);
    }
    // Specific category (e.g. rings, earrings, necklaces, bracelets): exactly 4 items
    return filteredProducts.slice(0, 4);
  }, [products, selectedCategory, filteredProducts]);

  const categories = [
    { id: 'all', labelKA: 'ყველა', labelEN: 'All', labelRU: 'Все' },
    { id: 'rings', labelKA: 'ბეჭედი', labelEN: 'Rings', labelRU: 'Кольца' },
    { id: 'earrings', labelKA: 'საყურე', labelEN: 'Earrings', labelRU: 'Серьги' },
    { id: 'necklaces', labelKA: 'ყელსაბამი', labelEN: 'Necklace', labelRU: 'Колье' },
    { id: 'bracelets', labelKA: 'სამაჯური', labelEN: 'Bracelets', labelRU: 'Браслеты' },
  ];

  const signatureProducts = products.filter((p) => p.isSignatureProduct);

  if (showFullCatalog) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans selection:bg-sky-200 selection:text-slate-900">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0EA5E9] text-white font-extrabold px-5 py-3 rounded-2xl shadow-2xl border border-sky-300 flex items-center gap-2 animate-bounce">
            <Check className="w-5 h-5 text-white" />
            <span className="text-xs tracking-wide">{toastMessage}</span>
          </div>
        )}

        {/* Full Separate Catalog Page */}
        <CatalogPage
          lang={lang}
          products={products}
          wishlist={wishlist}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={(p) => handleToggleWishlist(p)}
          onBackToHome={() => setShowFullCatalog(false)}
          onOpenCart={() => setCartOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAdmin={handleOpenAdmin}
          onLanguageChange={setLang}
          initialCategory={selectedCategory}
        />

        {/* Modals shared with main page */}
        <ProductModal
          product={selectedProduct}
          lang={lang}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        />

        <CartDrawer
          isOpen={cartOpen}
          lang={lang}
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={() => setCartItems([])}
        />

        <WishlistModal
          isOpen={wishlistOpen}
          lang={lang}
          wishlistItems={wishlist}
          onClose={() => setWishlistOpen(false)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onRemoveFromWishlist={(p) => handleToggleWishlist(p)}
        />

        <SearchModal
          isOpen={searchOpen}
          lang={lang}
          products={products}
          onClose={() => setSearchOpen(false)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        <AdminPanelModal
          isOpen={adminOpen}
          onClose={handleCloseAdmin}
          lang={lang}
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetProducts={handleResetProducts}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans selection:bg-sky-200 selection:text-slate-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0EA5E9] text-white font-extrabold px-5 py-3 rounded-2xl shadow-2xl border border-sky-300 flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5 text-white" />
          <span className="text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Hero Showcase Section with Unified Full Photo Background Header */}
      <Hero
        lang={lang}
        onExploreClick={() => {
          const el = document.getElementById('collections');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        signatureProducts={signatureProducts}
      >
        <Navbar
          lang={lang}
          onLanguageChange={setLang}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setCartOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAdmin={handleOpenAdmin}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onExploreClick={() => {
            const el = document.getElementById('collections');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </Hero>

      {/* Product Catalog Grid Section (Limited to 3 rows = 12 items on main page) */}
      <section id="collections" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Header & Filter Controls */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-6">
            <h2 className="text-3xl sm:text-4xl font-montserrat font-light tracking-[0.08em] text-slate-900">
              {lang === 'KA' ? 'სამკაულების საცავი' : lang === 'RU' ? 'Сокровищница украшений' : 'The Jewelry Vault'}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
        </div>

        {/* Product Cards Grid */}
        {displayedHomeProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedHomeProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  lang={lang}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                  onToggleWishlist={(p) => handleToggleWishlist(p)}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
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
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 text-xs font-montserrat text-sky-600 hover:underline uppercase tracking-wider cursor-pointer"
              >
                {lang === 'KA' ? 'ყველა ნამუშევრის ნახვა' : lang === 'RU' ? 'Смотреть все изделия' : 'View All Creations'}
              </button>
            )}
          </div>
        )}

        {/* View All Button leading to full catalog page */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              setShowFullCatalog(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-slate-900 hover:bg-sky-600 text-white font-montserrat font-medium text-xs uppercase tracking-[0.15em] rounded-full shadow-lg transition-all inline-flex items-center gap-2.5 group cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{lang === 'KA' ? 'სრული საცავი' : lang === 'RU' ? 'Полный каталог' : 'Full Vault'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-300" />
          </button>
        </div>

      </section>

      {/* Certificates & Authenticity Section */}
      <CertificatesSection lang={lang} />

      {/* Brand Heritage Section */}
      <AboutSection lang={lang} />

      {/* Contact Section */}
      <ContactSection lang={lang} />

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={selectedProduct}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        lang={lang}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={wishlistOpen}
        lang={lang}
        wishlistItems={wishlist}
        onClose={() => setWishlistOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        onRemoveFromWishlist={(p) => handleToggleWishlist(p)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        lang={lang}
        products={products}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Admin Panel Management Modal */}
      <AdminPanelModal
        isOpen={adminOpen}
        onClose={handleCloseAdmin}
        lang={lang}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
      />

    </div>
  );
}
