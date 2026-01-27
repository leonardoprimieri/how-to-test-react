import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { GetProductsResponse } from "@/pages/products-page/types/get-products-response";

interface ProductCardProps {
  product: GetProductsResponse;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card onClick={onClick} aria-label={`Open ${product.title} details`}>
      <CardContent>
        <div className="aspect-square bg-white/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <Badge className="mb-3 mx-auto w-fit bg-sky-500/20 text-sky-400 border-transparent hover:bg-sky-500/30">
          {product.category}
        </Badge>

        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      </CardContent>
      <CardFooter>
        <div className="text-2xl font-bold text-sky-500">
          ${product.price.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
