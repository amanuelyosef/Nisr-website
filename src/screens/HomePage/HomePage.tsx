import { useState } from "react";
import { CategoriesSection } from "./sections/CategoriesSection";
import { ElectronicsSection } from "./sections/ElectronicsSection";
import { FashionSection } from "../../components/ui/FashionSection";
import { TechProductsSection } from "./sections/TechProductsSection";
import { TrendingAdsSection } from "../../components/ui/TrendingAdsSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";

export const HomePage = (): JSX.Element => {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  return (
    <div className="bg-white overflow-hidden w-full min-w-[1440px] flex flex-col">
      <TrendingAdsSection onDownloadClick={() => setShowDownloadPopup(true)} />
      <FashionSection />
      <CategoriesSection />
      <TechProductsSection />
      <ElectronicsSection />
      <AppDownloadPopup isOpen={showDownloadPopup} onClose={() => setShowDownloadPopup(false)} />
    </div>
  );
};
