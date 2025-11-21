import "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/HomePage";
import { ProductDetailPage } from "./screens/ProductDetailPage";
import { SearchResultsPage } from "./screens/SearchResultsPage";
import { SellerShopPage } from "./screens/SellerShopPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/seller/:sellerId" element={<SellerShopPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
