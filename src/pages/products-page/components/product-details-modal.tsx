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
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{product?.title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
            <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
              <img
                src={product?.image}
                alt={product?.title}
                className="h-96 object-contain"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <p className="text-sm opacity-80 leading-relaxed mb-4 overflow-y-auto pr-1">
                {product?.description}
              </p>

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
