import { makeApiEndpoint } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

async function getCategories(): Promise<string[]> {
  const response = await fetch(makeApiEndpoint("/products/categories"));

  if (!response.ok) {
    throw new Error("Failed to fetch product categories");
  }

  const data = await response.json();

  return data;
}

export function useGetCategories() {
  return useQuery({
    queryFn: getCategories,
    queryKey: ["product-categories"],
  });
}
