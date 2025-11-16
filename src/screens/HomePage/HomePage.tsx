import React from "react";
import { CategoriesSection } from "./sections/CategoriesSection";
import { ElectronicsSection } from "./sections/ElectronicsSection";
import { FashionSection } from "./sections/FashionSection";
import { TechProductsSection } from "./sections/TechProductsSection";
import { TrendingAdsSection } from "./sections/TrendingAdsSection";

export const HomePage = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-w-[1440px] flex flex-col">
      <TrendingAdsSection />
      <FashionSection />
      <CategoriesSection />
      <TechProductsSection />
      <ElectronicsSection />
    </div>
  );
};
