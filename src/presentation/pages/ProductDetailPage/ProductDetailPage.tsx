import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { RecommendedProductsSection } from "../../components/ui/RecommendedProductsSection";
import { GetAppSection } from "../../components/ui/GetAppSection";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";
import WaitlistPopup from "../../components/ui/WaitlistPopup";
import img19_2 from "../../../assets/images/image-19-2.png";
import { LoadingSkeleton } from "../../components/ui/RecommendedProductsSection/sections/loadingSkeleton";
import { Details } from "../../components/ui/RecommendedProductsSection/sections/details";
import { useProductDetail } from "../../hooks/useProductDetail";

export const ProductDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shouldShowDescriptionToggle, setShouldShowDescriptionToggle] =
    useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // ← Data fetching delegated to hook (no Firebase imports needed here)
  const {
    product: productDetail,
    loading,
    error,
  } = useProductDetail(productId);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const productImage = productDetail?.imgList?.[0] || img19_2;
  const descriptionText = productDetail?.desc || "No description available.";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [productId]);

  // Mobile description "Show more" logic
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 640;
      setIsMobileViewport(mobile);

      if (!descriptionRef.current) {
        setShouldShowDescriptionToggle(false);
        return;
      }

      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight || "24",
      );
      const lines = descriptionRef.current.scrollHeight / lineHeight;
      setShouldShowDescriptionToggle(mobile && lines > 3);

      if (!mobile) setIsDescriptionExpanded(true);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [productDetail?.desc]);

  // Custom Skeleton using only div + animate-pulse

  if (loading) {
    return (
      <div className="bg-[#F0F0F0] min-h-screen">
        <div className="bg-white overflow-hidden w-full flex flex-col">
          <GetAppSection
            onDownloadClick={() => {}}
            onWaitlistClick={() => {}}
          />
          <TopAppBarSection onShowDownloadPopup={() => {}} />
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !productDetail) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#fe2188] hover:bg-[#fe2188]/90"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F0F0] min-h-screen">
      <div className="bg-white overflow-hidden w-full flex flex-col">
        <GetAppSection
          onDownloadClick={() => setShowDownloadPopup(true)}
          onWaitlistClick={() => setShowWaitlistPopup(true)}
        />
        <TopAppBarSection
          onShowDownloadPopup={() => setShowDownloadPopup(true)}
        />
      </div>

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

      <div className="max-w-[1320px] mx-auto px-0 sm:px-8 py-0 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 sm:gap-8">
          {/* Image */}
          <div className="rounded-none sm:rounded-[20px] overflow-hidden bg-gray-100">
            <img
              src={productImage}
              alt={productDetail.name}
              className="w-full h-64 sm:h-[600px] object-cover"
            />
          </div>

          {/* Details */}
          <Details
            productDetail={productDetail}
            setShowDownloadPopup={setShowDownloadPopup}
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <Card className="bg-white border-0 shadow-sm rounded-none sm:rounded-[15px]">
            <CardContent className="p-6">
              <h2 className="font-bold text-2xl mb-4">Description</h2>
              <p
                ref={descriptionRef}
                className={`text-base text-[#313131] leading-6 transition-all duration-200 ${
                  isMobileViewport && !isDescriptionExpanded
                    ? "max-h-[4.5em] overflow-hidden"
                    : ""
                }`}
              >
                {descriptionText}
              </p>
              {isMobileViewport && shouldShowDescriptionToggle && (
                <button
                  className="mt-3 text-[#fe2188] font-semibold text-sm"
                  onClick={() => setIsDescriptionExpanded((p) => !p)}
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <RecommendedProductsSection title="Discover More" />
        </div>
      </div>
    </div>
  );
};
