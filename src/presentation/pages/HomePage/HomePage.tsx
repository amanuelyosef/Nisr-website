import { useState } from "react";
import { CategoriesSection } from "../../features/home/sections/CategoriesSection/CategoriesSection";
import { TrendProductsSection } from "../../features/home/sections/TrendProductsSection/TrendProductsSection";
import { RecommendedProductsSection } from "../../components/ui/RecommendedProductsSection";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection";
import { GetAppSection } from "../../components/ui/GetAppSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";
import WaitlistPopup from "../../components/ui/WaitlistPopup";

export const HomePage = (): React.ReactElement => {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  return (
    <div className="bg-white overflow-hidden w-full flex flex-col">
      <GetAppSection
        onDownloadClick={() => setShowDownloadPopup(true)}
        onWaitlistClick={() => setShowWaitlistPopup(true)}
      />
      <TopAppBarSection
        onShowDownloadPopup={() => setShowDownloadPopup(true)}
      />
      <CategoriesSection />
      <TrendProductsSection />
      <RecommendedProductsSection title="Trending" />
      <AppDownloadPopup
        isOpen={showDownloadPopup}
        onClose={() => setShowDownloadPopup(false)}
        onWaitlistClick={() => {
          setShowDownloadPopup(false);
          setShowWaitlistPopup(true);
        }}
      />
      <WaitlistPopup
        isOpen={showWaitlistPopup}
        onClose={() => setShowWaitlistPopup(false)}
      />
    </div>
  );
};
