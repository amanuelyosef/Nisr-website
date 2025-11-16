import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";

const techProducts = [
  { id: 1, image: "/unsplash-pdds9xswyom-1.png", price: "ETB 1,000" },
  { id: 2, image: "/unsplash-ytbmycczqrs.png", price: "ETB 1,000" },
  { id: 3, image: "/unsplash-9u18fiowwbw-1.png", price: "ETB 1,000" },
  { id: 4, image: "/unsplash-novnxxmdni0.svg", price: "ETB 1,000" },
  { id: 5, image: "/unsplash-9u18fiowwbw.png", price: "ETB 1,000" },
  { id: 6, image: "/unsplash-ytbmycczqrs-1.png", price: "ETB 1,000" },
];

const fashionProducts = [
  { id: 7, image: "/rectangle-8.png", price: "ETB 1,000" },
  { id: 8, image: "/unsplash-0vsk2-9dkqo.png", price: "ETB 1,000" },
  { id: 9, image: "/unsplash-pdds9xswyom.png", price: "ETB 1,000" },
];

const stationaryProducts = [
  { id: 10, image: "/unsplash-pdds9xswyom-2.png", price: "ETB 1,000" },
  { id: 11, image: "/image-18.png", price: "ETB 1,000" },
  { id: 12, image: "/unsplash-0vsk2-9dkqo-1.png", price: "ETB 1,000" },
];

export const TechProductsSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1320px] mx-auto">
        <Card className="bg-[#ffc2d3] border-0 rounded-[10px]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[32px] tracking-[0.40px] leading-none">
                Tech Products
              </h2>
              <ChevronRightIcon className="w-5 h-5 text-black mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {techProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-full h-[157px] object-cover rounded-t-lg"
                    />
                    <div className="p-2 text-center">
                      <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-xs tracking-[0] leading-4">
                        {product.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="bg-[#abcfff] border-0 rounded-[10px]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[32px] tracking-[0.40px] leading-none">
                  Fashion
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-black mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {fashionProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-full h-[166px] object-cover rounded-t-lg"
                      />
                      <div className="p-2 text-center">
                        <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-xs tracking-[0] leading-4">
                          {product.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#b7ffcf] border-0 rounded-[10px]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-[32px] tracking-[0.40px] leading-none">
                  Stationary
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-black mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {stationaryProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white border-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-full h-[151px] object-cover rounded-t-lg"
                      />
                      <div className="p-2 text-center">
                        <span className="[font-family:'Nunito',Helvetica] font-extrabold text-[#fc3850] text-xs tracking-[0] leading-4">
                          {product.price}
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
