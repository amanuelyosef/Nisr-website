import { useState } from "react";
import { CategoriesSection } from "./sections/CategoriesSection";
import { ElectronicsSection } from "./sections/ElectronicsSection";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection";
import { TechProductsSection } from "./sections/TechProductsSection";
import { GetAppSection } from "../../components/ui/GetAppSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";
import WaitlistPopup from "../../components/ui/WaitlistPopup";

export const HomePage = (): JSX.Element => {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  return (
    <div className="bg-white overflow-hidden w-full flex flex-col">
      <GetAppSection
        onDownloadClick={() => setShowDownloadPopup(true)}
        onWaitlistClick={() => setShowWaitlistPopup(true)}
      />
      <TopAppBarSection onShowDownloadPopup={() => setShowDownloadPopup(true)} />
      <CategoriesSection />
      <TechProductsSection />
      <ElectronicsSection />
      <AppDownloadPopup 
        isOpen={showDownloadPopup} 
        onClose={() => setShowDownloadPopup(false)} 
        onWaitlistClick={() => {
          setShowDownloadPopup(false);
          setShowWaitlistPopup(true);
        }}
      />
      <WaitlistPopup isOpen={showWaitlistPopup} onClose={() => setShowWaitlistPopup(false)} />
    </div>
  );
};
