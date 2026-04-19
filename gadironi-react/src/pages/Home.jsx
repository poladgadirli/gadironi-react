import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import HeroSection from "../components/hero/HeroSection";
import FilterBar from "../components/filters/FilterBar";
import NewsletterSection from "../components/newsletter/NewsletterSection";
import CartDrawer from "../components/overlays/CartDrawer";
import SearchModal from "../components/overlays/SearchModal";
import Toast from "../components/overlays/Toast";
import UserModal from "../components/overlays/UserModal";
import ProductGrid from "../components/products/ProductGrid";
import { CATEGORIES, ITEMS_PER_PAGE } from "../data/categories";
import { ALL_PRODUCTS } from "../data/products";
import { useI18n } from "../i18n";
import "./Home.css";

export default function Home() {
  const { t } = useI18n();
  const [activeNav, setActiveNav] = useState("All Items");
  const [category, setCategory] = useState("All Items");
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeNav, category]);

  let filtered = ALL_PRODUCTS;
  const filterCategory = activeNav !== CATEGORIES[0] ? activeNav : category !== CATEGORIES[0] ? category : null;

  if (filterCategory) {
    filtered = filtered.filter((product) => product.category === filterCategory);
  }

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "Name A-Z") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  const addToast = (text) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, text }]);
    setTimeout(() => {
      setToasts((current) => current.filter((message) => message.id !== id));
    }, 2500);
  };

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }

      return [...current, { ...product, qty: 1 }];
    });
    addToast(t("toast.addedToCart", { productName: product.name }));
  };

  const handleRemove = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const handleQtyChange = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />
      <div className="home-page" style={{ background: "#f9f9f9", minHeight: "100vh", fontFamily: "'Manrope', sans-serif" }}>
        <Header
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          cartCount={cartCount}
          onSearch={() => setSearchOpen(true)}
          onCart={() => setCartOpen(true)}
          onUser={() => setUserOpen(true)}
        />
        <main>
          <HeroSection />
          <section className="product-section" style={{ padding: "56px 32px", background: "#f3f3f4" }}>
            <FilterBar
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
              filteredLength={filtered.length}
              start={start}
              end={end}
            />
            <ProductGrid products={paginated} onAddToCart={handleAddToCart} page={page} setPage={setPage} totalPages={totalPages} />
          </section>
          <NewsletterSection onToast={addToast} />
        </main>
        <Footer />
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onAddToCart={handleAddToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemove} onQtyChange={handleQtyChange} />
      <UserModal open={userOpen} onClose={() => setUserOpen(false)} />
      <Toast messages={toasts} />
    </>
  );
}
