import { useGetProducts } from "./hooks/use-get-products";
import { ProductCard } from "./components/product-card";
import { ProductCardSkeleton } from "./components/product-card-skeleton";
import type { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}

export function ProductsPage() {
  const getProductsQuery = useGetProducts();

  if (getProductsQuery.isLoading) {
    return (
      <Wrapper>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Wrapper>
    );
  }

  if (!getProductsQuery.data?.length) {
    return (
      <Wrapper>
        <p>No products found</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {getProductsQuery?.data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Wrapper>
  );
}
