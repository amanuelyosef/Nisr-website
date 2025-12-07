import React, { useState } from "react";
import { cn } from "../../lib/utils";

export type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
};

export const ProductImage = ({
  src,
  alt,
  className,
  containerClassName,
}: ProductImageProps): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-[#f8f8f8] overflow-hidden",
        containerClassName,
      )}
    >
      {!errored && (
        <img
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100",
            className,
          )}
          alt={alt}
          src={src}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setErrored(true);
            setLoading(false);
          }}
        />
      )}

      {loading && !errored && <div className="absolute inset-0 bg-[#f8f8f8]" />}

      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f8f8f8] text-[#b0b0b0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-10 w-10"
          >
            <path d="M4 5.5A1.5 1.5 0 015.5 4h13a1.5 1.5 0 011.5 1.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 16.5v-11z" />
            <path d="M4 15l3.5-3.5a1 1 0 011.414 0L14 17" />
            <path d="M12.5 14.5L15 12l3 3" />
            <circle cx="9" cy="8.5" r="1" />
          </svg>
          <span className="mt-2 text-xs [font-family:'Nunito',Helvetica]">Image unavailable</span>
        </div>
      )}
    </div>
  );
};
