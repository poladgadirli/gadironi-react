import MobileMenu from "./MobileMenu";
import logo from "../../assets/images/logo.png";
import { CATEGORIES } from "../../data/categories";
import Container from "../common/Container";
import HeaderIcons from "./HeaderIcons";
import LanguageSelector from "./LanguageSelector";
import { useI18n } from "../../i18n";
import "./Header.css";

export default function Header({
  activeNav,
  setActiveNav,
  cartCount,
  onSearch,
  onCart,
  onUser,
}) {
  const { getCategoryLabel } = useI18n();

  const handleHomeView = () => {
    setActiveNav(CATEGORIES[0]);
  };

  const brandLink = (
    <a
      href="#"
      className="brand"
      style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}
      onClick={handleHomeView}
    >
      <img className="brand-logo" src={logo} alt="Gadironi logo" style={{ width: 56, height: 56, objectFit: "contain" }} />
      <span
        className="brand-name"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#000",
          textTransform: "uppercase",
        }}
      >
        GADIRONI
      </span>
    </a>
  );

  return (
    <header
      className="topbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(249,249,249,0.97)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Container className="topbar-inner" style={{ width: "100%" }}>
        <div className="topbar-top-row">
          <div className="mobile-left-group">
            <MobileMenu
              categories={CATEGORIES.slice(1)}
              activeNav={activeNav}
              setActiveNav={setActiveNav}
            />
            {brandLink}
          </div>

          <div className="brand-row desktop-brand-row">
            {brandLink}
            <nav className="nav-links" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {CATEGORIES.slice(1).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveNav(category)}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: activeNav === category ? "#000" : "#aaa",
                    borderBottom: activeNav === category ? "1px solid #000" : "1px solid transparent",
                    paddingBottom: 2,
                    transition: "color 0.2s",
                  }}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </nav>
          </div>

          <div className="lang-selector" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <LanguageSelector />
          </div>
        </div>
        <div className="topbar-divider" />
        <HeaderIcons cartCount={cartCount} onHome={handleHomeView} onSearch={onSearch} onCart={onCart} onUser={onUser} />
        <div className="topbar-divider topbar-divider-bottom" />
      </Container>
    </header>
  );
}
