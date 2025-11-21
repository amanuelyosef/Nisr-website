import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { TrendingAdsSection } from "../../components/ui/TrendingAdsSection";
import { FashionSection } from "../../components/ui/FashionSection";
import img19_2 from "../../assets/images/image-19-2.png";
import img23_1 from "../../assets/images/image-23-1.png";
import img21_2 from "../../assets/images/image-21-2.png";
import img24_1 from "../../assets/images/image-24-1.png";

const shopProducts = [
  {
    id: 1,
    image: img19_2,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 2,
    image: img23_1,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 3,
    image: img21_2,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 4,
    image: img24_1,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 5,
    image: img21_2,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 6,
    image: img24_1,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 7,
    image: img19_2,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 8,
    image: img23_1,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 9,
    image: img21_2,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
  {
    id: 10,
    image: img24_1,
    description: "Brand new Lamborghini 2025 made in USA high speed and ...",
    price: "ETB 1,000",
    location: "Addis Ababa",
    condition: "Brand New",
  },
];

export const SellerShopPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <div className="bg-white overflow-hidden w-full min-w-[1440px] flex flex-col">
        <TrendingAdsSection />
        <FashionSection />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-white border-0 shadow-sm rounded-[15px] p-0 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-[100px] h-[100px] bg-[#fe2188] rounded-full flex items-center justify-center mb-4">
                    <span className="[font-family:'Nunito',Helvetica] font-bold text-white text-5xl">
                      A
                    </span>
                  </div>
                  <h2 className="[font-family:'Nunito',Helvetica] font-bold text-black text-xl tracking-[0] leading-[normal] text-center mb-2">
                    Abebe Kebede Shop
                  </h2>
                  <p className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-sm tracking-[0] leading-[normal] text-center mb-1">
                    Last seen: 1 week ago
                  </p>
                  <p className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-sm tracking-[0] leading-[normal] text-center">
                    26 days in Nisr Market
                  </p>
                </div>

                <Button className="w-full h-12 bg-[#fe2188] hover:bg-[#fe2188]/90 rounded-[10px] [font-family:'Nunito',Helvetica] font-bold text-white text-base tracking-[0] leading-[normal] mb-4">
                  Call
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 bg-[#f5f5f5] border border-[#e0e0e0] hover:bg-[#f0f0f0] rounded-[10px] [font-family:'Nunito',Helvetica] font-semibold text-[#313131] text-base tracking-[0] leading-[normal] flex items-center justify-center gap-2"
                >
                  <span>Feedback</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="#313131"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </Card>
          </aside>

          <main>
            <div className="mb-8">
              <h1 className="[font-family:'Nunito',Helvetica] font-bold text-black text-4xl tracking-[0] leading-[normal]">
                All items
              </h1>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {shopProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white rounded-[15px] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-[4/3]">
                      <img
                        className="w-full h-full object-cover rounded-t-[15px]"
                        alt="Product"
                        src={product.image}
                      />
                    </div>
                    <div className="p-4">
                      <p className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-sm tracking-[0] leading-5 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="[font-family:'Nunito',Helvetica] font-extrabold text-[#120b0b] text-lg tracking-[0] leading-5 mb-2">
                        {product.price}
                      </p>
                      <p className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-xs tracking-[0] leading-4">
                        {product.location} • {product.condition}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
