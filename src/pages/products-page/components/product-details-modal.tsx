import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { GetProductsResponse } from "@/pages/products-page/types/get-products-response";
import { StarIcon } from "lucide-react";

interface ProductDetailsModalProps {
  product: GetProductsResponse | null;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="lg:max-w-7xl w-full bg-slate-900/90 backdrop-blur-sm p-6 ring-0">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>{product?.title}</DialogTitle>
        </DialogHeader>

        <DialogDescription className="mt-2">
          <div className="flex gap-4">
            <div className="w-1/3 aspect-square bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm opacity-70 mb-4">{product?.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <StarIcon />
                  <span className="font-semibold">{product?.rating.rate}</span>
                  <span className="text-sm opacity-50">
                    ({product?.rating.count} reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-sky-500">
                  ${product?.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
