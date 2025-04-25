import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { getTheme, setTheme, debugTheme } from "./lib/theme";

// Aplicar o tema inicial
const initialTheme = getTheme();
setTheme(initialTheme);

// Executar debug
setTimeout(() => {
  debugTheme();
}, 1000);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
