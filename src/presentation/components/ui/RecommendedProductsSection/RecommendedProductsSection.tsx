import React, { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../card";
import { ProductImage } from "../ProductImage";
import { useRecommendedProducts } from "../../../hooks/useRecommendedProducts";

export interface RecommendedProductsSectionProps {
  title?: ReactNode;
}

export const RecommendedProductsSection = ({
  title,
}: RecommendedProductsSectionProps): React.ReactElement => {
  const navigate = useNavigate();
  const heading = title ?? "Trending";
  const { productList, isFetching, hasMore, fetchNextBatch } =
    useRecommendedProducts();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to trigger loading when near bottom
  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isFetching) {
          fetchNextBatch();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextBatch, hasMore, isFetching]);

  return (
    <section className="w-full bg-[#efefef] py-4 px-2 sm:py-6 sm:px-4 md:py-9 md:px-6">
      <div className="max-w-[1262px] mx-auto">
        <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[24px] sm:text-[28px] md:text-[32px] tracking-[0.40px] leading-4 mb-4 sm:mb-8 md:mb-10 px-1 sm:px-0">
          {heading}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-5 lg:gap-5 mb-14 lg:mb-0 auto-rows-auto justify-items-center">
          {productList.map((product) => (
            <Card
              key={product.id}
              className="bg-[#fffdfd] rounded-[15px] border-0 shadow-none overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-full max-w-[260px]"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                <ProductImage
                  src={product.img}
                  alt="Product"
                  containerClassName="relative w-full aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
                <div className="p-3">
                  <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-xs tracking-[0] leading-4 mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="[font-family:'Nunito',Helvetica] font-extrabold text-[#120b0b] text-base tracking-[0] leading-4 mb-2">
                    ETB {product.price}
                  </p>
                  <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-[11px] tracking-[0] leading-4">
                    {product.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Sentinel for infinite scroll */}
        <div className="w-full h-16" ref={loaderRef} />
        {isFetching && (
          <div className="text-center text-sm text-[#313131] [font-family:'Nunito',Helvetica] pb-6">
            Loading more…
          </div>
        )}
      </div>
    </section>
  );
};
