import { useState } from "react";
import type { GetProductsResponse } from "./types/get-products-response";
import { useGetProducts } from "./hooks/use-get-products";
import { ProductCard } from "./components/product-card";
import { ProductCardSkeleton } from "./components/product-card-skeleton";
import { ProductsContainer } from "./components/page-container";
import { ProductCategorySelector } from "./components/product-category-selector/product-category-selector";
import { useSearchParams } from "react-router";
import { ProductDetailsModal } from "./components/product-details-modal";
import { AddProductModal } from "./components/add-product-modal/add-product-modal";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsPage() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const getProductsQuery = useGetProducts({ category: selectedCategory });
  const [selectedProduct, setSelectedProduct] =
    useState<GetProductsResponse | null>(null);

  if (getProductsQuery.isError) {
    return (
      <ProductsContainer>
        There was an error fetching the products.
      </ProductsContainer>
    );
  }

  if (getProductsQuery.isLoading) {
    return (
      <div className="flex items-start flex-col">
        <Skeleton className="h-12 w-48 my-2 self-center" />
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-32 mt-4" />
        <ProductsContainer>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </ProductsContainer>
      </div>
    );
  }

  if (!getProductsQuery.data?.length) {
    return <ProductsContainer>No products found</ProductsContainer>;
  }

  return (
    <div className="flex items-start flex-col">
      <h1 className="text-5xl font-semibold my-2 self-center">Products</h1>
      <ProductCategorySelector />
      <div className="mt-4">
        <AddProductModal />
      </div>
      <ProductsContainer>
        {getProductsQuery?.data?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </ProductsContainer>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
