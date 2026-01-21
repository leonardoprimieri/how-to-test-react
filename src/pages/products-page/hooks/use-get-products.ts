import { useQuery } from "@tanstack/react-query";
import type { GetProductsResponse } from "../types/get-products-response";
import { makeApiEndpoint } from "@/config/api";

type GetProductsParams = {
  category?: string | null;
};

async function getProducts(
  params: GetProductsParams
): Promise<GetProductsResponse[]> {
  const url = params.category
    ? makeApiEndpoint(`/products/category/${params.category}`)
    : makeApiEndpoint("/products");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export function useGetProducts({ category }: GetProductsParams = {}) {
  return useQuery({
    queryKey: ["products-list", category],
    queryFn: () => getProducts({ category }),
  });
}
