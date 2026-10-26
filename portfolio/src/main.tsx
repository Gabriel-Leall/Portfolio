import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "lenis/dist/lenis.css";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <App />
);
