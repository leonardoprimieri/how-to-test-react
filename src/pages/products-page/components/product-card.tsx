import { Badge } from "@/components/ui/badge";
import type { GetProductsResponse } from "@/pages/products-page/types/get-products-response";
import { StarIcon } from "lucide-react";

interface ProductCardProps {
  product: GetProductsResponse;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="border border-white/10 rounded-xl p-6 bg-white/5 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-2xl flex flex-col"
      role="button"
      tabIndex={0}
      onClick={onClick}
      aria-label={`Open ${product.title} details`}
    >
      <div className="aspect-square bg-white/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      <Badge className="mb-3 w-fit bg-sky-500/20 text-sky-400 border-transparent hover:bg-sky-500/30">
        {product.category}
      </Badge>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[2.8rem] leading-snug">
        {product.title}
      </h3>

      <p className="text-sm opacity-70 mb-4 line-clamp-3 flex-1 leading-relaxed">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <StarIcon />
          <span className="font-semibold">{product.rating.rate}</span>
        </div>
        <span className="text-sm opacity-50">
          ({product.rating.count} reviews)
        </span>
      </div>

      <div className="text-2xl font-bold text-sky-500">
        ${product.price.toFixed(2)}
      </div>
    </div>
  );
}
