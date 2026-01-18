import { useQuery } from "@tanstack/react-query";
import type { GetProductsResponse } from "../types/get-products-response";

async function getProducts(): Promise<GetProductsResponse[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products-list"],
    queryFn: getProducts,
  });
}
