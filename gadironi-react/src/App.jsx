import { useState } from "react";
import logo from './assets/logo.png';
import languageIcon from './assets/language.png';

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"; // placeholder, replaced below

const products = [
  { id: 1, name: "Standard Tee 01", price: "$140", colors: ["#1a1c1c", "#e2e2e2", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzepO1PY2mkVaxJm16W-wLf6e21SJrNH-HRK5-bjWDemKkhmTWId48tm1pNGiMRz4T9DoFy7tuIdawCabs2Gtzbc3uFxs7ae0NVoLu8DAegk5VA6rGEj9avBdKdms07L2S-DX9C11Noe9sEZYcRd7BELVfElExM6a1GZUAklnrDZLF2kmVzJsgND6WMA8Tiwge6i71vI6VhSWoSaLIXHc3BE9jMv7WrNQbC0J90LxEOcHSVoTifmTkiCYEVD1RJK6XcicepacuO58" },
  { id: 2, name: "Pleated Trouser", price: "$320", colors: ["#1a1c1c", "#dadada"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1jUG0_fQr9jxh4KFSbx3iWvhI9zkG08RR7FwxRvS0-C6Epu9-5CtuBuIomCEinKlhAPxpw_ewt08IeoWDXl5T0Sklhe04O7OC2Vwun0To0gECdyCDCZlUtJbu-uIY3khE3wVSHiDDyIN_yGe9NYKeryiOjckTAC-6YCrBEFVKKp8dyiHNuDcH2zYvLBNy3s554TbHQMC_muLpc4IKs7jS9ej8CjHyZduEB46vDt1rfL-1Qau6iXC2uuu-NK74xs-9ZEv_0cFza2Y" },
  { id: 3, name: "Monolith Coat", price: "$890", colors: ["#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQDUkpjnSg4sYPM2oy0kEXqmYfAWVH-3uL2g24yxdbXI6_5PTerYIhjOxqHCxZc31_1KE4P6vJwx3KDiDcRVSsGM5m2BYxZGESNOeD8AahuxI8GpQk2www7DLdsureVKFc-UtnxYiztqor5yL7chjoqnFg3-PV4S0Xy_xIrWVfl5YwJjnLAAW_ezj4LitbuaAyYXSUsGFMw_HIf_mMS60FVVtu91WehuSWm71l_6ef-VkJvUnmFxYBIgnSkpLVY3htBTu7_OX2Es" },
  { id: 4, name: "Cashmere Rib", price: "$450", colors: ["#ffffff", "#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIVU7W6nlWMmJitD1goPYpKj1tMox1525R0k2e6kJzY-bxSYkxRyxzD7l8PnKd-CUGa8oMaBCXVoXBNMjGq3m6JJ5X8lhkGbuFCBca3l24-VOCt1ZfIfzq3c6hFjtBInulklHr6ivTouNJDFffl37jm1128xQDWkHhwleDf75QsruUboiimTs6I7PvYUQIGZ3j9e559DJcgng73t2ZcBPsoGVUL1RdbkUjJwue2fE4G_bwbU2AR9xSDaWkcS_bArAvxG61MBR79WI" },
  { id: 5, name: "Essential Pack", price: "$280", colors: ["#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACl0MD03-ydVHwc_XLE063tRs48HokVkeeSVRuEGpfLaWfOE_qEVT1eizEDQ5qh-zy6En9a5NSkopQqvl4Bo6VnEZjG50oIdVSpFowORJUkxsiuYYE8jQL_cOaY-uqdYGGlGmfQ6Ji-QF_gvphXbSOjLtmmI5QVq8Yk2lETFG-rudcYvFLt3PSzqnIRI4kdleODgMRDVBUz_sA0pbd9FjbidMmqB0Jo1RtgTRfOzw10NrVJhaeNinyL4fGt9xukerYDJq_sqOIXuU" },
  { id: 6, name: "Void Shirt", price: "$195", colors: ["#1a1c1c", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcI9AESSiLaf-3fkmseHulnyShuvWFXaB6a_4kJfJv4dmdF-FEblBxjkF0fwllzizVokqL2CDmptiezp33XCmViV2m-bfZ8-zZnJOkhOtKkmhO1WZfxnE_dMjTE5oS2mevAkROztmLPPPmjl8wM1-H0JA35iEUhU5ps-qsiZbH15IZMSZhTA-K3WIJEEgUCXjwDk-lCZ6X5Gz9qttZ5_D4o0MfXuQ2Bzh7D_SlDVaLAc5Ysl0On-kd9fWw6b5I9WIawg3PBcTgF54" },
  { id: 7, name: "Wide Sculpt Pant", price: "$380", colors: ["#1b1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHwLhq-Cp-d4jqcUwvuJUWCYEvo2awii2JeMfQBF9iWR_R5rN9de5fs63TVgzFqdnm_dgZcUOAxRPtd_7WVU3AG_Fe8Xxd1JOiM0OXaSIglPLTKeyCuw6PN-aj2sSiU2X12cuLUWNMrYIJCfvyjb2OKTY_Li_0VxzjOsRcC5Wv0XyUEbVw4rz2QqiP1gmMc_qjhduFGPitniQZZRh8eT-aLApP8QdoKtJXP8bJHxBCJpPLjzJgcDlcy1QP9nKtDTjmYWHyvthrX9g" },
  { id: 8, name: "Oversize Knit", price: "$310", colors: ["#474747", "#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqD9DvAw49AMryUflMUPWvrWzyybWHT6M3Ykop37fp1cZns9fNQnqW1X3yroo28tUFLHxIMG7KowkBjjdOcTHB1NRPULS6RddUaqYAdl77sKYX25l8GjHDqFEde5KPvf-4nwksVwnskPXUE_uPfBgfostF-wbJR2fac_68s-nPABXD0CG4X-e1_i6xajW_E--9jQbZNyMHduED6XHOiQbRieVkCMU4zpGcUAmLM5homCFw-p7ksNcyaRWBgvxpj25vJ8qBCwQJkJY" },
];

const navLinks = ["Shirts", "T-Shirts & Polos", "Hoodies & Sweaters", "Coats & Jackets", "Trousers"];
const languageOptions = ["English", "Azerbaijan", "Russian"];

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBhNqlV7mum3IhvoRVJWzH1sogdWe06kIK_dXICs1yZr1Co72L_4fLEyMJTqw6ZwxP-5HGMuccSwmkMydriGetvbgtLbslpnvypOto8Xm8S-M2rmNngOMUI9bew3ou2BQh0FlndCn69CUeS3Gr0yt1y3a2Gr5PkA1PmefHYHjZqyK4j7omI89xpvK-7_URJiD-yC7TZHPZz4lCpf9DFNQ5NQGiOt1DKP5a92OiKxSt5yFCSayoMjd-lfLbbJd1Sx7xHts8fWU9SZMU";
const NEWSLETTER_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI9sOOT73xoGb5qt8YjhgNUuFO2sUu3u3GiaBfLjF1qhUluHI2nbH1rHUA5SerSfxKahtS2OvOth2AeYXw3B3rEHn5OB0ApvqJn7rAjTHHpQ9uehThDxPet0wIGTkK5tj8mKf2hJ_fCBZvaqt4avj7vHAqYZqw2bA67YE-oQYyvbCyxst69FUi6HP1Cq8Wc1woAnbjXwF4ewcOsMBNE0uXFuJbWVjtAdE66vCsHRYDRgFIWKkWOcdsTaSeHmHh7sFluNPaHmUBho";
const GADIRONI_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuDrPeqsL2kGFxlLikXB3OPd6sU9t1NLMmkbqC-weTl5aJPbzS45g1DuJbSXdsPdmUkqaQDqZ8N1N-4bkRVNJ06_F1y2I5RsUQm4yEG1LMVkV6_8MH_IVRk-9KFm5DFiNhpTFBgVEbm-Nqg0kxbcKLfhpZ7sF_M4UxJGhlJvJI_-1G_UX8ZzaI6j8Nd7fN1mJdJPxRLZNoxN1MBo-8M8Tsp4OHTi2rMHTr9Vc22RFuXtG6MqIyBo9-U6b1C2E5TkHfq8Xkr4B7c";

// --- Sub-components ---

function Navbar({ activeNav, setActiveNav, activeLanguage, setActiveLanguage }) {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  return (
    <header style={{
      background: "#f9f9f9",
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "12px 24px",
        maxWidth: 1440,
        margin: "0 auto",
      }}>
        {/* Logo + Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img
              src={logo}
              alt="Gadironi Logo"
              style={{ width: 96, height: 96, objectFit: "contain" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#000",
              textTransform: "uppercase",
            }}>GADIRONI</span>
          </a>
          <nav style={{ display: "flex", gap: 32 }}>
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => setActiveNav(link)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: activeNav === link ? "#000" : "#aaa",
                  borderBottom: activeNav === link ? "1px solid #000" : "none",
                  paddingBottom: activeNav === link ? 2 : 0,
                  transition: "color 0.2s",
                  padding: "2px 0",
                }}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
        {/* Language selector */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setLanguageMenuOpen(open => !open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 999,
              padding: "6px 10px",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#333",
            }}
          >
            <img src={languageIcon} alt="Language" style={{ width: 16, height: 16 }} />
            {activeLanguage}
          </button>

          {languageMenuOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
              padding: "12px",
              minWidth: 180,
              zIndex: 100,
            }}>
              {languageOptions.map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setActiveLanguage(lang);
                    setLanguageMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 10px",
                    borderRadius: 12,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    fontWeight: activeLanguage === lang ? 800 : 600,
                    color: activeLanguage === lang ? "#000" : "#444",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["search", "person", "shopping_bag"].map(icon => (
            <button key={icon} style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.6,
              transition: "opacity 0.2s",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
            >
              <span className="material-symbols-outlined" style={{ color: "#000", fontSize: 20 }}>{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      position: "relative",
      height: 480,
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
      padding: "0 32px 40px",
      background: "#f9f9f9",
    }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src={HERO_IMG}
          alt="Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.9 }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }} />
      </div>
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 1440,
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
      }}>
        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(48px, 7vw, 80px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 1,
          margin: 0,
        }}>
          Essential<br />Monolith
        </h1>
        <p style={{
          color: "#fff",
          fontSize: 13,
          lineHeight: 1.7,
          fontStyle: "italic",
          opacity: 0.85,
          maxWidth: 320,
          fontFamily: "'Noto Serif', serif",
          margin: 0,
        }}>
          A curation of structural silhouettes and architectural textiles. Designed for the modern observer who finds beauty in the void.
        </p>
      </div>
    </section>
  );
}

function ColorDot({ color, active }) {
  return (
    <div style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color,
      border: color === "#ffffff" ? "1px solid #ccc" : "none",
      outline: active ? "1px solid #000" : "none",
      outlineOffset: 2,
    }} />
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ background: "#f9f9f9" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        aspectRatio: "3/4",
        overflow: "hidden",
        background: "#eeeeee",
        position: "relative",
      }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
        <button style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          background: "#000",
          color: "#fff",
          padding: 12,
          border: "none",
          cursor: "pointer",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          display: "flex",
          alignItems: "center",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
        </button>
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1,
          }}>{product.name}</h3>
          <span style={{
            fontFamily: "'Noto Serif', serif",
            fontStyle: "italic",
            fontSize: 13,
          }}>{product.price}</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {product.colors.map((c, i) => <ColorDot key={i} color={c} active={i === 0} />)}
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  const [activePage, setActivePage] = useState(1);

  return (
    <section style={{ padding: "56px 32px", background: "#f3f3f4" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Filters bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 24,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["All Items", "Filters", "Sort by"].map((label, i) => (
              <button key={label} style={{
                background: i === 0 ? "#000" : "transparent",
                color: i === 0 ? "#fff" : "#000",
                border: i === 0 ? "none" : "1px solid rgba(0,0,0,0.15)",
                padding: "8px 20px",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}>{label}</button>
            ))}
          </div>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#5f5e5e",
          }}>Showing 01 — 08 of 48</span>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "rgba(0,0,0,0.08)",
        }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, marginTop: 24 }}>
          {["01", "02", "03", "Next"].map((p, i) => (
            <button
              key={p}
              onClick={() => setActivePage(i + 1)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activePage === i + 1 ? "#000" : "#5f5e5e",
                borderBottom: activePage === i + 1 ? "2px solid #000" : "none",
                paddingBottom: 2,
                transition: "color 0.2s",
              }}
            >{p}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section style={{
      background: "#000",
      padding: "80px 32px",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 48,
        position: "relative",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            lineHeight: 1,
            margin: 0,
          }}>The Monolith Journal</h2>
          <p style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            fontStyle: "italic",
            margin: 0,
          }}>
            Receive exclusive access to new architectural releases and seasonal editorials. No noise. Just the essential.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                padding: "12px 0",
                outline: "none",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                width: "100%",
              }}
            />
            <button style={{
              alignSelf: "flex-start",
              background: "none",
              border: "none",
              borderBottom: "1px solid #fff",
              color: "#fff",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              paddingBottom: 2,
            }}>Subscribe</button>
          </div>
        </div>
        <div style={{ flexShrink: 0, width: 288 }}>
          <img
            src={NEWSLETTER_IMG}
            alt="Journal"
            style={{
              width: "100%",
              filter: "grayscale(1)",
              opacity: 0.4,
              transform: "translate(32px, 32px)",
              contrast: 1.25,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", padding: "56px 32px" }}>
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 40,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 18,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
          }}>GADIRONI</span>
          <p style={{
            fontFamily: "'Noto Serif', serif",
            fontStyle: "italic",
            fontSize: 12,
            color: "#777",
            lineHeight: 1.8,
            margin: 0,
          }}>Elevating the garment to its architectural peak. Minimalist intent, maximum structural integrity.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {[
            { title: "Discover", links: ["Collection", "Editorial", "Archive"] },
            { title: "Company", links: ["Sustainability", "Legal"] },
            { title: "Connect", links: ["Instagram", "Twitter"] },
          ].map(col => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#fff",
              }}>{col.title}</span>
              {col.links.map(link => (
                <a key={link} href="#" style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#777",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#777"}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        maxWidth: 1440,
        margin: "32px auto 0",
        paddingTop: 32,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          © 2024 GADIRONI. THE ARCHITECTURAL MONOLITH.
        </span>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          01 — 48
        </span>
      </div>
    </footer>
  );
}

// --- Root App ---
export default function App() {
  const [activeNav, setActiveNav] = useState("T-Shirts & Polos");
  const [activeLanguage, setActiveLanguage] = useState("English");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />
      <div style={{ background: "#f9f9f9", minHeight: "100vh", fontFamily: "'Manrope', sans-serif" }}>
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />
        <main>
          <Hero />
          <ProductGrid />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}
