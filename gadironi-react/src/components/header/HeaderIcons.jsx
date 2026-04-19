import Button from "../common/Button";
import { useI18n } from "../../i18n";

export default function HeaderIcons({ cartCount, onHome, onSearch, onCart, onUser }) {
  const { t } = useI18n();

  return (
    <div className="icon-actions" style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Button
        onClick={onHome}
        title={t("header.home")}
        className="home-icon-link"
        style={{ display: "flex", opacity: 0.65 }}
        onMouseEnter={(event) => {
          event.currentTarget.style.opacity = 1;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.opacity = 0.65;
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
          home
        </span>
      </Button>
      <Button
        onClick={onSearch}
        title={t("header.search")}
        style={{ display: "flex", opacity: 0.65 }}
        onMouseEnter={(event) => {
          event.currentTarget.style.opacity = 1;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.opacity = 0.65;
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
          search
        </span>
      </Button>
      <Button
        onClick={onCart}
        title={t("header.cart")}
        style={{ display: "flex", position: "relative", opacity: 0.65 }}
        onMouseEnter={(event) => {
          event.currentTarget.style.opacity = 1;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.opacity = 0.65;
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
          shopping_bag
        </span>
        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "#000",
              color: "#fff",
              borderRadius: "50%",
              width: 16,
              height: 16,
              fontSize: 9,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartCount}
          </span>
        )}
      </Button>
      <Button
        onClick={onUser}
        title={t("header.account")}
        style={{ display: "flex", opacity: 0.65 }}
        onMouseEnter={(event) => {
          event.currentTarget.style.opacity = 1;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.opacity = 0.65;
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
          person
        </span>
      </Button>
    </div>
  );
}
