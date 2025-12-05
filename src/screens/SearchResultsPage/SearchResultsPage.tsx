import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { GetAppSection } from "../../components/ui/GetAppSection";
import { TopAppBarSection } from "../../components/ui/TopAppBarSection";
import AppDownloadPopup from "../../components/ui/AppDownloadPopup";
import WaitlistPopup from "../../components/ui/WaitlistPopup";
import { searchProducts } from "../../lib/algolia";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const SearchResultsPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedPriceFilter, setAppliedPriceFilter] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, { id: string; name: string; img?: string }>>({});
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortOptions = ["Most viewed", "Newest", "Lowest price", "Highest price"];
  const sortIndexMap: Record<string, string | undefined> = {
    "Most viewed": undefined, // default index
    "Newest": "search product posted date descending",
    "Lowest price": "search product price ascending",
    "Highest price": "search product price descending",
  };
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = (searchParams.get("q") ?? "").trim();
  const initializedFromParams = useRef(false);

  const syncSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const buildPriceFilter = (min: string, max: string) => {
    const minTrim = min.trim();
    const maxTrim = max.trim();
    if (minTrim && maxTrim) return `price >= ${minTrim} AND price <= ${maxTrim}`;
    if (minTrim) return `price >= ${minTrim}`;
    if (maxTrim) return `price <= ${maxTrim}`;
    return "";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });

  // Initialize filters from URL parameters once (for back-navigation persistence)
  useEffect(() => {
    if (initializedFromParams.current) return;
    initializedFromParams.current = true;

    const initCategory = searchParams.get("category");
    const initConditionRaw = searchParams.get("condition");
    const initCondition = initConditionRaw === "Brand New" ? "New" : initConditionRaw; // backwards-compat mapping
    const initDelivery = searchParams.get("delivery");
    const initMin = searchParams.get("min") ?? "";
    const initMax = searchParams.get("max") ?? "";

    if (initCategory) setSelectedCategories([initCategory]);
    if (initCondition) setSelectedConditions([initCondition]);
    if (initDelivery) setSelectedDelivery([initDelivery]);
    if (initMin) setMinPrice(initMin);
    if (initMax) setMaxPrice(initMax);

    const initialPriceFilter = buildPriceFilter(initMin, initMax);
    if (initialPriceFilter) setAppliedPriceFilter(initialPriceFilter);
  }, [searchParams]);

  const buildFilters = () => {
    const parts: string[] = [];

    if (selectedCategories[0]) {
      parts.push(`categoryId:${selectedCategories[0]}`);
    }

    if (selectedConditions[0]) {
      const conditionValue = selectedConditions[0];
      parts.push(`condition:${conditionValue}`);
    }

    if (selectedDelivery[0]) {
      const delivery = selectedDelivery[0];
      if (delivery === "Free Delivery") {
        parts.push("freeDelivery:true");
      } else if (delivery === "Paid Delivery") {
        parts.push("freeDelivery:false");
      } else if (delivery === "No Delivery") {
        parts.push("freeDelivery:null");
      }
    }

    if (appliedPriceFilter) {
      parts.push(appliedPriceFilter);
    }

    return parts.join(" AND ");
  };

  useEffect(() => {
    const runSearch = async () => {
      if (!searchQuery) {
        setQueryResults([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const filters = buildFilters();
        const options: Record<string, any> = { hitsPerPage: 40 };
        if (filters) options.filters = filters;

        const res = await searchProducts(
          searchQuery,
          options,
          sortIndexMap[sortOption]
        );
        setQueryResults(res.hits ?? []);
      } catch (err: any) {
        setError(err?.message ?? "Search failed");
        setQueryResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    runSearch();
  }, [searchQuery, sortOption, selectedCategories, selectedConditions, selectedDelivery, appliedPriceFilter]);

  // Collect unique categoryIds from the latest search hits
  useEffect(() => {
    const ids = new Set<string>();
    queryResults.forEach((hit: any) => {
      const cid = hit.categoryId ?? hit.category_id ?? hit.category;
      if (typeof cid === "string" && cid.trim()) ids.add(cid.trim());
    });
    setAvailableCategories(Array.from(ids));
  }, [queryResults]);

  // Fetch category metadata map once and keep it in memory
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const ref = doc(db, "categories", "category_list");
        const snap = await getDoc(ref);
        if (!snap.exists()) return;
        const data = snap.data();
        const list: any[] = (data?.list as any[]) || [];
        const map: Record<string, { id: string; name: string; img?: string }> = {};
        list.forEach((item) => {
          if (item?.id) {
            map[item.id] = { id: item.id, name: item.name ?? item.id, img: item.img };
          }
        });
        setCategoryMap(map);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch category list", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isSortMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortMenuOpen]);

  const conditions = [
    { label: "Brand New", value: "New" },
    { label: "Used", value: "Used" },
    { label: "Repacked", value: "Repacked" },
  ];
  const deliveryOptions = ["Free Delivery", "Paid Delivery", "No Delivery"];

  // Single-select toggle: select the value, or deselect if already selected
  const toggleSingle = (
    value: string,
    selected: string[],
    setter: (value: string[]) => void
  ) => {
    if (selected.length === 1 && selected[0] === value) {
      setter([]);
    } else {
      setter([value]);
    }
  };

  const filterContent = (
    <>
      <Card className="bg-white rounded-[15px] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <h3 className="[font-family:'Nunito',Helvetica] font-bold text-black text-xl tracking-[0] leading-[normal] mb-4">
            Category Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((categoryId) => {
              const category = categoryMap[categoryId];
              const label = category?.name ?? categoryId;
              return (
                <button
                  key={categoryId}
                  onClick={() => {
                    const next = selectedCategories[0] === categoryId ? [] : [categoryId];
                    setSelectedCategories(next);
                    syncSearchParams({
                      q: searchQuery,
                      category: next[0] ?? null,
                      condition: selectedConditions[0] ?? null,
                      delivery: selectedDelivery[0] ?? null,
                      min: minPrice || null,
                      max: maxPrice || null,
                    });
                  }}
                  className={`px-4 py-2 rounded-[50px] border [font-family:'Nunito',Helvetica] font-medium text-sm tracking-[0] leading-[normal] transition-colors ${
                    selectedCategories.includes(categoryId)
                      ? "bg-[#fe2188] text-white border-[#fe2188]"
                      : "bg-[#f5f5f5] text-[#313131] border-[#e0e0e0] hover:border-[#fe2188]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-[15px] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h3 className="[font-family:'Nunito',Helvetica] font-bold text-black text-xl tracking-[0] leading-[normal] mb-4">
                  Price Filter
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="min"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={minInputRef}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          maxInputRef.current?.focus();
                        }
                      }}
                      className="h-10 bg-[#f5f5f5] border-[#e0e0e0] rounded-md [font-family:'Nunito',Helvetica] font-normal text-[#313131] text-sm"
                    />
                    <span className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-lg">
                      —
                    </span>
                    <Input
                      type="text"
                      placeholder="max"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={maxInputRef}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const min = minPrice.trim();
                          const max = maxPrice.trim();
                          const filterStr = buildPriceFilter(min, max);
                          setMinPrice(min);
                          setMaxPrice(max);
                          setAppliedPriceFilter(filterStr || null);
                          syncSearchParams({
                            q: searchQuery,
                            category: selectedCategories[0] ?? null,
                            condition: selectedConditions[0] ?? null,
                            delivery: selectedDelivery[0] ?? null,
                            min: min || null,
                            max: max || null,
                          });
                        }
                      }}
                      className="h-10 bg-[#f5f5f5] border-[#e0e0e0] rounded-md [font-family:'Nunito',Helvetica] font-normal text-[#313131] text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-[10px] bg-[#fe2188] text-white px-3 py-2 text-sm font-semibold hover:bg-[#ff3a9d] transition-colors"
                      onClick={() => {
                        const min = minPrice.trim();
                        const max = maxPrice.trim();
                        const filterStr = buildPriceFilter(min, max);
                        setMinPrice(min);
                        setMaxPrice(max);
                        setAppliedPriceFilter(filterStr || null);
                        syncSearchParams({
                          q: searchQuery,
                          category: selectedCategories[0] ?? null,
                          condition: selectedConditions[0] ?? null,
                          delivery: selectedDelivery[0] ?? null,
                          min: min || null,
                          max: max || null,
                        });
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </CardContent>
      </Card>

      <Card className="bg-white rounded-[15px] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <h3 className="[font-family:'Nunito',Helvetica] font-bold text-black text-xl tracking-[0] leading-[normal] mb-4">
            Condition
          </h3>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <label
                key={condition.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="condition"
                  checked={selectedConditions.includes(condition.value)}
                  onClick={() => {
                    const next = selectedConditions[0] === condition.value ? [] : [condition.value];
                    setSelectedConditions(next);
                    syncSearchParams({
                      q: searchQuery,
                      category: selectedCategories[0] ?? null,
                      condition: next[0] ?? null,
                      delivery: selectedDelivery[0] ?? null,
                      min: minPrice || null,
                      max: maxPrice || null,
                    });
                  }}
                  onChange={() => {
                    const next = selectedConditions[0] === condition.value ? [] : [condition.value];
                    setSelectedConditions(next);
                    syncSearchParams({
                      q: searchQuery,
                      category: selectedCategories[0] ?? null,
                      condition: next[0] ?? null,
                      delivery: selectedDelivery[0] ?? null,
                      min: minPrice || null,
                      max: maxPrice || null,
                    });
                  }}
                  className="w-4 h-4 rounded border-[#e0e0e0] text-[#fe2188] focus:ring-[#fe2188]"
                />
                <span className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-base tracking-[0] leading-[normal]">
                  {condition.label}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-[15px] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <h3 className="[font-family:'Nunito',Helvetica] font-bold text-black text-xl tracking-[0] leading-[normal] mb-4">
            Delivery
          </h3>
          <div className="space-y-2">
            {deliveryOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={selectedDelivery.includes(option)}
                  onClick={() => {
                    const next = selectedDelivery[0] === option ? [] : [option];
                    setSelectedDelivery(next);
                    syncSearchParams({
                      q: searchQuery,
                      category: selectedCategories[0] ?? null,
                      condition: selectedConditions[0] ?? null,
                      delivery: next[0] ?? null,
                      min: minPrice || null,
                      max: maxPrice || null,
                    });
                  }}
                  onChange={() => {
                    const next = selectedDelivery[0] === option ? [] : [option];
                    setSelectedDelivery(next);
                    syncSearchParams({
                      q: searchQuery,
                      category: selectedCategories[0] ?? null,
                      condition: selectedConditions[0] ?? null,
                      delivery: next[0] ?? null,
                      min: minPrice || null,
                      max: maxPrice || null,
                    });
                  }}
                  className="w-4 h-4 rounded border-[#e0e0e0] text-[#fe2188] focus:ring-[#fe2188]"
                />
                <span className="[font-family:'Nunito',Helvetica] font-normal text-[#313131] text-base tracking-[0] leading-[normal]">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="bg-[#efefef] min-h-screen">
      <div className="overflow-hidden w-full flex flex-col">
        <GetAppSection
          onDownloadClick={() => setShowDownloadPopup(true)}
          onWaitlistClick={() => setShowWaitlistPopup(true)}
        />
        <TopAppBarSection onShowDownloadPopup={() => setShowDownloadPopup(true)} />
      </div>

      <AppDownloadPopup
        isOpen={showDownloadPopup}
        onClose={() => setShowDownloadPopup(false)}
        onWaitlistClick={() => {
          setShowDownloadPopup(false);
          setShowWaitlistPopup(true);
        }}
      />
      <WaitlistPopup isOpen={showWaitlistPopup} onClose={() => setShowWaitlistPopup(false)} />

      <div className="max-w-[1440px] mx-auto px-2 sm:px-8 py-2 sm:py-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 hidden lg:block">
            {filterContent}
          </aside>

          <main>
            <div className="flex flex-wrap items-center justify-between mb-4">

              <h1 className="my-0 [font-family:'Nunito',Helvetica] font-bold text-black text-[20px] sm:text-3xl md:text-4xl lg:text-3xl tracking-[0] leading-tight text-left lg:w-auto">
                Search results
              </h1>
              <div className="flex items-center gap-0">
                <div className="flex items-center gap-2">
                  <div className="relative" ref={sortDropdownRef}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-0 rounded-full border border-[#fe2188] px-3 py-2 text-sm [font-family:'Nunito',Helvetica] text-[#fe2188] font-semibold text-base shadow-sm hover:bg-[#fe2188]/10 transition-colors"
                      onClick={() => setIsSortMenuOpen((prev) => !prev)}
                    >
                      <span>Sort</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1"
                      >
                        <path d="M7 10L12 15L17 10H7Z" fill="#fe2188" />
                      </svg>
                      <span className="ml-1 font-normal text-[#313131] hidden md:inline">{sortOption}</span>
                    </button>
                    {isSortMenuOpen && (
                      <ul className="absolute mt-2 w-48 rounded-xl border border-[#e0e0e0] bg-white shadow-lg z-20">
                        {sortOptions.map((option) => (
                          <li
                            key={option}
                            className={`px-4 py-2 cursor-pointer [font-family:'Nunito',Helvetica] text-sm ${
                              option === sortOption
                                ? "text-[#fe2188] font-semibold"
                                : "text-[#313131] hover:bg-[#fe2188]/10"
                            }`}
                            onClick={() => {
                              setSortOption(option);
                              setIsSortMenuOpen(false);
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-[#fe2188] px-3 py-2 text-sm font-semibold text-[#fe2188] [font-family:'Nunito',Helvetica] hover:bg-[#fe2188]/10 transition-colors lg:hidden"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 4H13"
                        stroke="#fe2188"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 8H11"
                        stroke="#fe2188"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 12H9"
                        stroke="#fe2188"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-5 mb-14 lg:mb-0 auto-rows-auto justify-items-center">
              {isLoading && (
                <div className="col-span-full text-center text-[#313131] [font-family:'Nunito',Helvetica]">Searching…</div>
              )}
              {!isLoading && error && (
                <div className="col-span-full text-center text-red-600 [font-family:'Nunito',Helvetica]">{error}</div>
              )}
              {!isLoading && !error && searchQuery === "" && (
                <div className="col-span-full text-center text-[#313131] [font-family:'Nunito',Helvetica]">
                  Enter a search to see products.
                </div>
              )}
              {!isLoading && !error && searchQuery !== "" && queryResults.length === 0 && (
                <div className="col-span-full text-center text-[#313131] [font-family:'Nunito',Helvetica]">
                  No products found for “{searchQuery}”.
                </div>
              )}

              {queryResults.map((product: any) => {
                // Normalize Algolia hit fields to our UI expectations
                // The record identifier comes from the document name in our index.
                // Try common document-name fields first, then fall back to other ids.
                const id =
                  product.documentName ??
                  product.document_name ??
                  product._documentName ??
                  product._doc ??
                  product._id ??
                  product.objectID ??
                  product.objectId ??
                  product.id ??
                  product.name;
                const name = product.name ?? "Product";
                const price = product.price ?? "0";
                const baseDescription = product.desc ?? "";
                const image = product.imgList?.[0] ?? "";

                // Derive a concise label from condition and delivery/negotiable flags
                const condition = product.condition ?? "";
                const freeDelivery = product.freeDelivery ?? null;
                const negotiable = product.negotiable ?? null;

                let otherDesc = "";
                if (freeDelivery === true) {
                  otherDesc = "Free delivery";
                } else if (negotiable === true) {
                  otherDesc = "Negotiable";
                } else if (freeDelivery === false) {
                  otherDesc = "Paid delivery";
                } else if (negotiable === false) {
                  otherDesc = "Fixed price";
                }

                const derivedDescription = condition
                  ? `${condition}${otherDesc ? ` • ${otherDesc}` : ""}`
                  : otherDesc;

                const cardDescription = derivedDescription || baseDescription;

                return (
                  <Card
                    key={id || name}
                    className="bg-[#fffdfd] rounded-[15px] border-0 shadow-none overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-full max-w-[260px]"
                    onClick={() => id && navigate(`/product/${id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-[4/3]">
                        <img
                          className="w-full h-full object-cover"
                          alt={name}
                          src={image}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-xs tracking-[0] leading-4 mb-2 line-clamp-2">
                          {name}
                        </p>
                        <p className="[font-family:'Nunito',Helvetica] font-extrabold text-[#120b0b] text-base tracking-[0] leading-4 mb-2">
                          {price ? `ETB ${price}` : ""}
                        </p>
                        <p className="[font-family:'Nunito',Helvetica] font-medium text-[#313131] text-[11px] tracking-[0] leading-4">
                          {cardDescription}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-[30px] sm:rounded-[30px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="[font-family:'Nunito',Helvetica] font-bold text-black text-2xl tracking-[0] leading-[normal]">
                Filters
              </h2>
              <button
                type="button"
                className="text-[#313131]"
                onClick={() => setIsFilterOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#313131"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#313131"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-6">{filterContent}</div>
            <button
              type="button"
              className="mt-6 w-full rounded-[12px] bg-[#fe2188] py-3 text-white font-semibold [font-family:'Nunito',Helvetica]"
              onClick={() => setIsFilterOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
