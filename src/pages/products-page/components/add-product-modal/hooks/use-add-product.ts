import { makeApiEndpoint } from "@/config/api";
import { useMutation } from "@tanstack/react-query";

type ProductBody = {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

async function addProduct(body: ProductBody) {
  const response = await fetch(makeApiEndpoint("/products"), {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error while creating the product");
  }

  return response;
}

export function useAddProduct() {
  return useMutation({
    mutationFn: addProduct,
  });
}
