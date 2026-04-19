import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import Button from "../common/Button";
import InputField from "./InputField";

export default function UserModal({ open, onClose }) {
  const { t } = useI18n();
  const [tab, setTab] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({ email: "", password: "", name: "" });
      setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={(event) => event.stopPropagation()} style={{ background: "#fff", width: "min(420px, 94vw)", padding: "40px 40px 36px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#000" }}>
              check_circle
            </span>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 16 }}>
              {tab === "signin" ? t("user.welcomeBack") : t("user.accountCreated")}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {tab === "signin" ? t("user.signIn") : t("user.createAccount")}
              </div>
              <Button onClick={onClose} style={{ display: "flex" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  close
                </span>
              </Button>
            </div>

            <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              {["signin", "register"].map((value) => (
                <Button
                  key={value}
                  onClick={() => setTab(value)}
                  style={{
                    flex: 1,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    paddingBottom: 12,
                    color: tab === value ? "#000" : "#aaa",
                    borderBottom: tab === value ? "2px solid #000" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {value === "signin" ? t("user.signIn") : t("user.register")}
                </Button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {tab === "register" && <InputField label={t("user.fullName")} type="text" value={form.name} onChange={(name) => setForm((current) => ({ ...current, name }))} />}
              <InputField label={t("user.emailAddress")} type="email" value={form.email} onChange={(email) => setForm((current) => ({ ...current, email }))} />
              <InputField label={t("user.password")} type="password" value={form.password} onChange={(password) => setForm((current) => ({ ...current, password }))} />
            </div>

            <Button
              onClick={handleSubmit}
              style={{
                marginTop: 28,
                width: "100%",
                background: "#000",
                color: "#fff",
                padding: 14,
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              {tab === "signin" ? t("user.signIn") : t("user.createAccount")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
