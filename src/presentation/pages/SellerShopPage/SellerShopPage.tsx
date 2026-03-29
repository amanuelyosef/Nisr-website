import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { GetAppSection } from "../../components/ui/GetAppSection";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";
import WaitlistPopup from "../../components/ui/WaitlistPopup";
import { ProductImage } from "../../components/ui/ProductImage";
// ← Data fetching delegated to hooks – no direct Firebase imports
import { useSellerData } from "../../hooks/useSellerData";
import { useSellerProducts } from "../../hooks/useSellerProducts";
import {
  toDateValue,
  formatTimeAgo,
  formatTenure,
} from "../../../shared/utils/dateUtils";

const DEFAULT_PROFILE_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'><rect width='120' height='120' rx='60' fill='%23e5e7eb'/><path d='M60 60c11.046 0 20-8.954 20-20S71.046 20 60 20 40 28.954 40 40s8.954 20 20 20Z' fill='%23cbd5e1'/><path d='M25 95c0-14.359 15.67-26 35-26s35 11.641 35 26v5H25v-5Z' fill='%23cbd5e1'/></svg>";

const DEFAULT_SHOP_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' fill='none'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23e5e7eb'/><stop offset='100%' stop-color='%23d1d5db'/></linearGradient></defs><rect width='600' height='240' rx='12' fill='url(%23g)'/><rect x='48' y='48' width='120' height='120' rx='12' fill='%23cbd5e1'/><rect x='198' y='60' width='320' height='24' rx='6' fill='%23cbd5e1'/><rect x='198' y='102' width='260' height='20' rx='5' fill='%23dbeafe'/><rect x='198' y='138' width='200' height='18' rx='5' fill='%23e5e7eb'/></svg>";

export const SellerShopPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { sellerId } = useParams<{ sellerId: string }>();
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [shopImgSrc, setShopImgSrc] = useState(DEFAULT_SHOP_IMG);
  const [profileImgSrc, setProfileImgSrc] = useState(DEFAULT_PROFILE_IMG);
  const [shopImgLoaded, setShopImgLoaded] = useState(false);
  const [profileImgLoaded, setProfileImgLoaded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ← Seller data from hook
  const { seller, sellerLoading, sellerError } = useSellerData(sellerId);

  // ← Products from hook
  const {
    products,
    productsLoading,
    productsError,
    productsLoadingMore,
    hasMoreProducts,
    loadMoreProducts,
  } = useSellerProducts(sellerId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setShopImgSrc(seller?.shopImg || DEFAULT_SHOP_IMG);
    setProfileImgSrc(seller?.profileImg || DEFAULT_PROFILE_IMG);
    setShopImgLoaded(false);
    setProfileImgLoaded(false);
  }, [seller?.shopImg, seller?.profileImg]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const node = sentinelRef.current;
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasMoreProducts &&
          !productsLoading &&
          !productsLoadingMore
        ) {
          loadMoreProducts();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [
    loadMoreProducts,
    hasMoreProducts,
    productsLoading,
    productsLoadingMore,
    products.length,
  ]);

  const shopName = seller?.shopName || "Seller shop";
  const lastSeenText = sellerLoading
    ? "Loading..."
    : seller
      ? formatTimeAgo(toDateValue(seller.lastSeen ?? null))
      : "Unavailable";
  const tenureText = sellerLoading
    ? "Loading..."
    : formatTenure(toDateValue(seller?.signUpDate ?? null));

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
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

      <div className="max-w-[1440px] mx-auto px-0 sm:px-8 py-0 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-8 lg:grid lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <Card className="bg-white border-0 shadow-sm rounded-none sm:rounded-[24px] p-0 overflow-hidden">
              <div className="relative">
                {/* Banner Image */}
                <div className="w-full h-56 bg-gradient-to-b from-[#e8e8e8] to-[#f5f5f5] relative overflow-hidden">
                  {!shopImgLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ededed] to-[#d9d9d9] animate-pulse" />
                  )}
                  <img
                    src={shopImgSrc}
                    alt={`${shopName} banner`}
                    className="w-full h-full object-cover"
                    onLoad={() => setShopImgLoaded(true)}
                    onError={() => {
                      setShopImgSrc(DEFAULT_SHOP_IMG);
                      setShopImgLoaded(true);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex flex-col items-left -mt-16 mb-4">
                    <div className="w-[120px] h-[120px] bg-[#1E88E5] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg relative z-10">
                      {!profileImgLoaded && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0f0f0] to-[#d9d9d9] animate-pulse" />
                      )}
                      <img
                        src={profileImgSrc}
                        alt={`${shopName} profile`}
                        className="w-full h-full object-cover rounded-full"
                        onLoad={() => setProfileImgLoaded(true)}
                        onError={() => {
                          setProfileImgSrc(DEFAULT_PROFILE_IMG);
                          setProfileImgLoaded(true);
                        }}
                      />
                    </div>

                    {/* Seller name */}
                    <h2 className="[font-family:'Nunito',Helvetica] font-bold text-[#120b0b] text-2xl tracking-[0] leading-[normal] text-left mb-1">
                      {shopName}
                    </h2>
                    {/* Seller last seen */}
                    <p className="[font-family:'Nunito',Helvetica] font-normal text-[#757575] text-sm tracking-[0] leading-[normal] text-left mb-1">
                      Last seen: {sellerError ? "Unavailable" : lastSeenText}
                    </p>
                    {/* Seller duration in Nisr Market */}
                    <p className="[font-family:'Nunito',Helvetica] font-normal text-[#757575] text-sm tracking-[0] leading-[normal] text-left">
                      {sellerError ? "On Nisr Market" : tenureText}
                    </p>
                    {sellerError && (
                      <p className="[font-family:'Nunito',Helvetica] font-normal text-[#d14343] text-xs tracking-[0] leading-[normal] text-left mt-1">
                        Seller info unavailable
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-2 flex flex-col items-center">
                    <Button
                      className="w-full h-14 max-w-100 bg-[#FFC4D5] border-3 border-[#FF5252] hover:bg-[#FFF3E0] rounded-[16px] [font-family:'Nunito',Helvetica] font-bold text-[#FF5252] text-lg tracking-[0] leading-[normal] transition-colors"
                      onClick={() => setShowDownloadPopup(true)}
                    >
                      Call
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-14 max-w-100 bg-[#E4E4E4] border-0 hover:bg-[#D8D8D8] rounded-[16px] [font-family:'Nunito',Helvetica] font-bold text-[#120b0b] text-base tracking-[0] leading-[normal] gap-2 transition-colors"
                      onClick={() => setShowDownloadPopup(true)}
                    >
                      <span>Feedback</span>
                      <span className="w-full"></span>
                      <svg
                        style={{ width: "36px", height: "36px" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="#120b0b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          <main>
            <div className="mb-2 sm:mb-4">
              <h1 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[22px] sm:text-[28px] md:text-[32px] tracking-[0.40px] leading-4 mb-4 sm:mb-8 md:mb-10 px-1 sm:px-0">
                All items
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-3 mb-14 lg:mb-0 px-2 sm:px-0">
              {productsLoading && (
                <div className="col-span-4 text-sm text-[#757575] [font-family:'Nunito',Helvetica] px-2 py-4">
                  Loading products...
                </div>
              )}

              {!productsLoading && productsError && (
                <div className="col-span-4 text-sm text-[#d14343] [font-family:'Nunito',Helvetica] px-2 py-4">
                  {productsError}
                </div>
              )}

              {!productsLoading && !productsError && products.length === 0 && (
                <div className="col-span-4 text-sm text-[#757575] [font-family:'Nunito',Helvetica] px-2 py-4">
                  No products available.
                </div>
              )}

              {!productsLoading &&
                !productsError &&
                products.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-[#fffdfd] rounded-[15px] border-0 shadow-none overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-full max-w-[260px]"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <ProductImage
                        src={product.img}
                        alt={product.name || "Product"}
                        containerClassName="relative w-full aspect-[4/3]"
                        className="w-full h-full object-cover"
                      />
                      <div className="p-3">
                        <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-xs tracking-[0] leading-4 mb-2 line-clamp-2">
                          {product.name || "Untitled"}
                        </p>
                        <p className="[font-family:'Nunito',Helvetica] font-extrabold text-[#120b0b] text-base tracking-[0] leading-4 mb-1">
                          ETB{" "}
                          {product.price?.toLocaleString?.("en-US") ??
                            product.price}
                        </p>
                        <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-[11px] tracking-[0] leading-4">
                          {product.desc || "No description"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              <div ref={sentinelRef} className="col-span-4 h-1" />

              {productsLoadingMore && (
                <div className="col-span-4 text-sm text-[#757575] [font-family:'Nunito',Helvetica] px-2 py-4">
                  Loading more products...
                </div>
              )}

              {!hasMoreProducts && products.length > 0 && (
                <div className="col-span-4 text-xs text-[#9e9e9e] [font-family:'Nunito',Helvetica] px-2 py-3 text-center">
                  You have reached the end.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
