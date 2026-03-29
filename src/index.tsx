import "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./app/routes";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
