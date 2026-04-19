import Home from "./pages/Home";
import { LanguageProvider } from "./i18n";

export default function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}
