import { MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const topImages = [
  {
    src: "/display-electronics-image.png",
    alt: "Display electronics",
    label: "Electronics",
  },
  {
    src: "/display-fashion-image-1.png",
    alt: "Display fashion",
    label: "Fashion",
  },
  {
    src: "/display-furniture-image.png",
    alt: "Display furniture",
    label: "Furniture",
  },
];

const categories = [
  {
    src: "/image-35.png",
    alt: "Electronics",
    label: "Electronics",
  },
  {
    src: "/image-58.png",
    alt: "Stationary",
    label: "Stationary",
  },
  {
    src: "/image-59.png",
    alt: "Food and Drink",
    label: "Food and Drink",
  },
  {
    src: "/image-61.png",
    alt: "Health and Beauty",
    label: "Health and Beauty",
  },
  {
    src: "/image-38.png",
    alt: "Services",
    label: "Services",
  },
  {
    src: "/image-60.png",
    alt: "Fashion",
    label: "Fashion",
  },
  {
    src: "/image-63.png",
    alt: "Lost and Found",
    label: "Lost and Found",
  },
  {
    src: "/image-65.png",
    alt: "Sport and Outdoor",
    label: "Sport and Outdoor",
  },
  {
    src: "/image-64.png",
    alt: "Books and Art",
    label: "Books and Art",
  },
  {
    src: null,
    alt: "More",
    label: "More",
    isMore: true,
  },
];

export const CategoriesSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#ffe4f087] py-10 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          {topImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                className="w-full h-[295px] rounded-[20px] object-cover"
                alt={image.alt}
                src={image.src}
              />
              <div className="absolute bottom-4 left-4 text-white text-2xl font-bold [font-family:'Nunito',Helvetica]">
                {image.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 mt-4">
          <h2 className="[font-family:'Nunito',Helvetica] font-bold text-black text-4xl tracking-[0] leading-[normal]">
            Categories
          </h2>

          <div className="grid grid-cols-5 gap-6 max-w-[1000px] mx-auto">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-white rounded-[10px] border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-0 flex flex-col items-center justify-center h-[120px] relative">
                  {category.isMore ? (
                    <MoreHorizontalIcon className="w-[91px] h-[91px] text-gray-700" />
                  ) : (
                    <img
                      className="w-full h-[90px] object-contain px-3 pt-2"
                      alt={category.alt}
                      src={category.src}
                    />
                  )}
                  <div className="absolute bottom-2 [font-family:'Nunito',Helvetica] font-semibold text-[#151414] text-sm tracking-[0] leading-[normal] text-center px-2">
                    {category.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
