import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import "./i18n";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    disableTransitionOnChange
  >
    <App />
  </ThemeProvider>
);
