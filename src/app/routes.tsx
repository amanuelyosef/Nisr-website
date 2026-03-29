import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "../presentation/pages/HomePage/HomePage";
import { SearchResultsPage } from "../presentation/pages/SearchResultsPage/SearchResultsPage";
import { ProductDetailPage } from "../presentation/pages/ProductDetailPage/ProductDetailPage";
import { SellerShopPage } from "../presentation/pages/SellerShopPage/SellerShopPage";

// ScrollToTop component ensures the window scrolls to top on route change
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/seller/:sellerId" element={<SellerShopPage />} />
      </Routes>
    </BrowserRouter>
  );
};
