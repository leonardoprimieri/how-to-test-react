import { useGetProducts } from "./hooks/use-get-products";
import { ProductCard } from "./components/product-card";
import { ProductCardSkeleton } from "./components/product-card-skeleton";
import { ProductsContainer } from "./components/page-container";
import { ProductCategorySelector } from "./components/product-category-selector/product-category-selector";
import { useSearchParams } from "react-router";

export function ProductsPage() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const getProductsQuery = useGetProducts({ category: selectedCategory });

  if (getProductsQuery.isError) {
    return (
      <ProductsContainer>
        There was an error fetching the products.
      </ProductsContainer>
    );
  }

  if (getProductsQuery.isLoading) {
    return (
      <div className="flex flex-col">
        <h1 className="text-5xl font-semibold my-2">Products</h1>
        <ProductCategorySelector />
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
    <div className="flex flex-col">
      <h1 className="text-5xl font-semibold my-2">Products</h1>
      <ProductCategorySelector />
      <ProductsContainer>
        {getProductsQuery?.data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </div>
  );
}
