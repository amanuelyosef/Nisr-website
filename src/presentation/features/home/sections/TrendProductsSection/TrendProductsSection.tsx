import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { ProductImage } from "../../../../components/ui/ProductImage";
import { useEffect, useState } from "react";
// ← Data fetching via use case – no direct Firebase import
import { getTrendProducts } from "../../../../../application/useCases/getTrendProducts";
import type { TrendGroup } from "../../../../../domain/entities/trends";
export const TrendProductsSection = (): React.ReactElement => {
  const navigate = useNavigate();
  const [techProducts, setTechProducts] = useState<TrendGroup | null>(null);
  const [fashionProducts, setFashionProducts] = useState<TrendGroup | null>(
    null,
  );
  const [stationaryProducts, setStationaryProducts] =
    useState<TrendGroup | null>(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getTrendProducts();
        if (data) {
          setTechProducts(data.list[0] ?? null);
          setFashionProducts(data.list[1] ?? null);
          setStationaryProducts(data.list[2] ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch trend products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="w-full px-0 sm:px-4 py-0 sm:py-6">
      <div className="flex flex-col gap-0 sm:gap-3 md:gap-5 lg:flex-row max-w-[1320px] mx-auto">
        <Card className="bg-[#ffc2d3] border-0 rounded-none sm:rounded-[10px] w-full lg:w-1/2">
          <CardContent className="px-0 sm:px-5 py-2 sm:py-5 ">
            <div className="flex items-center gap-0 sm:gap-2 mb-2">
              <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[22px] sm:text-[26px] md:text-[30px] tracking-[0.40px] leading-none px-2">
                Tech products
              </h2>
              <ChevronRightIcon className="w-5 h-5 text-black mt-0 sm:mt-1" />
            </div>
            <div className="flex gap-x-4 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-0 pt-0 sm:pt-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:gap-y-10">
              {techProducts?.list?.map((product: any) => (
                <Card
                  key={product.id}
                  className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-44 sm:min-w-[180px] flex-shrink-0 lg:min-w-0"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <ProductImage
                      src={product.img}
                      alt="Product"
                      containerClassName="w-full h-32 sm:h-[157px] rounded-t-lg"
                      className="w-full h-full object-cover"
                    />
                    <div className="p-2">
                      <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-[16px] sm:text-[18px] tracking-[0] leading-4">
                        ETB {product.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-0 sm:gap-6 w-full lg:w-1/2">
          <Card className="bg-[#abcfff] border-0 rounded-none sm:rounded-[10px]">
            <CardContent className="px-0 sm:px-5 py-2 sm:py-5">
              <div className="flex items-center gap-0 sm:gap-2 mb-4">
                <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[22px] sm:text-[26px] md:text-[30px] tracking-[0.40px] leading-none px-2">
                  Fashion
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-black mt-0 sm:mt-1" />
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-4 px-4 sm:px-0">
                {fashionProducts?.list?.slice(0, 3).map((product: any) => (
                  <Card
                    key={product.id}
                    className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-44 sm:min-w-[180px] flex-shrink-0 lg:min-w-0"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <ProductImage
                        src={product.img}
                        alt="Product"
                        containerClassName="w-full h-32 sm:h-[157px] rounded-t-lg"
                        className="w-full h-full object-cover"
                      />
                      <div className="p-2">
                        <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-[16px] sm:text-[18px] tracking-[0] leading-4">
                          ETB {product.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#b7ffcf] border-0 rounded-none sm:rounded-[10px]">
            <CardContent className="px-0 sm:px-5 py-2 sm:py-5">
              <div className="flex items-center gap-0 sm:gap-2 mb-4">
                <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[22px] sm:text-[26px] md:text-[30px] tracking-[0.40px] leading-none px-2">
                  Stationery
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-black mt-0 sm:mt-1" />
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-4 px-4 sm:px-0">
                {stationaryProducts?.list?.slice(0, 3).map((product: any) => (
                  <Card
                    key={product.id}
                    className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-44 sm:min-w-[180px] flex-shrink-0 lg:min-w-0"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <ProductImage
                        src={product.img}
                        alt="Product"
                        containerClassName="w-full h-32 sm:h-[157px] rounded-t-lg"
                        className="w-full h-full object-cover"
                      />
                      <div className="p-2">
                        <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-[16px] sm:text-[18px] tracking-[0] leading-4">
                          ETB {product.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
