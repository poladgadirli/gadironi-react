import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import en from "./en.json";
import az from "./az.json";
import ru from "./ru.json";

const STORAGE_KEY = "gadironi-language";
export const FALLBACK_LANGUAGE = "en";
export const LANGUAGE_OPTIONS = ["en", "az", "ru"];

const dictionaries = { en, az, ru };

const CATEGORY_KEY_MAP = {
  "All Items": "categories.allItems",
  Shirts: "categories.shirts",
  "T-Shirts & Polos": "categories.tshirtsAndPolos",
  "Hoodies & Sweaters": "categories.hoodiesAndSweaters",
  "Coats & Jackets": "categories.coatsAndJackets",
  Trousers: "categories.trousers",
};

const SORT_KEY_MAP = {
  Default: "sort.default",
  "Price: Low to High": "sort.priceLowToHigh",
  "Price: High to Low": "sort.priceHighToLow",
  "Name A-Z": "sort.nameAZ",
};

const I18nContext = createContext(null);

function resolveLanguage(value) {
  return LANGUAGE_OPTIONS.includes(value) ? value : FALLBACK_LANGUAGE;
}

function formatTemplate(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return FALLBACK_LANGUAGE;
    return resolveLanguage(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => {
    const dictionary = dictionaries[language] ?? dictionaries[FALLBACK_LANGUAGE];
    const fallbackDictionary = dictionaries[FALLBACK_LANGUAGE];

    const t = (key, params) => {
      const template = dictionary[key] ?? fallbackDictionary[key] ?? key;
      return typeof template === "string" ? formatTemplate(template, params) : key;
    };

    const getCategoryLabel = (category) => t(CATEGORY_KEY_MAP[category] ?? category);
    const getSortLabel = (sort) => t(SORT_KEY_MAP[sort] ?? sort);
    const setLanguage = (nextLanguage) => setLanguageState(resolveLanguage(nextLanguage));

    return {
      language,
      setLanguage,
      t,
      getCategoryLabel,
      getSortLabel,
    };
  }, [language]);

  return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }

  return context;
}

export function useLanguage() {
  const { language, setLanguage } = useI18n();
  return { language, setLanguage };
}
