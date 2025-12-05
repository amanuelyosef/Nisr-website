import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

type ProductData = {
  desc: string;
  id: string;
  img: string;
  name: string;
  price: number;
};

type pageData = {
  list: ProductData[];
  nextDocumentId: string | null;
};

export interface RecommendedProductsSectionProps {
  title?: ReactNode;
}

export const RecommendedProductsSection = ({
  title,
}: RecommendedProductsSectionProps): React.ReactElement => {
  const navigate = useNavigate();
  const heading = title ?? "Trending";
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [nextDocumentId, setNextDocumentId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchDocument = useCallback(async (docId: string): Promise<pageData | null> => {
    try {
      const ref = doc(db, "recommended_product_list", docId);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return snap.data() as pageData;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch recommended products doc", err);
      return null;
    }
  }, []);

  // Load the initial document (page_1)
  useEffect(() => {
    const loadInitial = async () => {
      setIsFetching(true);
      const initial = await fetchDocument("page_1");
      if (initial) {
        setProductList(initial.list ?? []);
        setNextDocumentId(initial.nextDocumentId ?? null);
        setHasMore(Boolean(initial.nextDocumentId));
      } else {
        setProductList([]);
        setHasMore(false);
        setNextDocumentId(null);
      }
      setIsFetching(false);
    };

    loadInitial();
  }, [fetchDocument]);

  // Fetch up to 3 documents in sequence starting from the current nextDocumentId
  const fetchNextBatch = useCallback(async () => {
    if (isFetching || !hasMore || !nextDocumentId) return;
    setIsFetching(true);

    let currentId: string | null = nextDocumentId;
    let fetchedAny = false;

    for (let i = 0; i < 3 && currentId; i += 1) {
      const data = await fetchDocument(currentId);
      if (!data) {
        currentId = null;
        break;
      }

      setProductList((prev) => [...prev, ...(data.list ?? [])]);
      fetchedAny = true;
      currentId = data.nextDocumentId ?? null;

      if (!currentId) break;
    }

    setNextDocumentId(currentId);
    setHasMore(Boolean(currentId));
    if (!fetchedAny) {
      setHasMore(false);
    }

    setIsFetching(false);
  }, [fetchDocument, hasMore, isFetching, nextDocumentId]);

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
      { root: null, rootMargin: "200px", threshold: 0.1 }
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
                <div className="relative w-full aspect-[4/3]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Product"
                    src={product.img}
                  />
                </div>
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
