import { useGetProducts } from "./hooks/use-get-products";
import { ProductCard } from "./components/product-card";
import { ProductCardSkeleton } from "./components/product-card-skeleton";
import { ProductsContainer } from "./components/page-container";

export function ProductsPage() {
  const getProductsQuery = useGetProducts();

  if (getProductsQuery.isLoading) {
    return (
      <ProductsContainer>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </ProductsContainer>
    );
  }

  if (!getProductsQuery.data?.length) {
    return (
      <ProductsContainer>
        <p>No products found</p>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      {getProductsQuery?.data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductsContainer>
  );
}
