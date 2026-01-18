import type { GetProductsResponse } from "@/pages/products-page/types/get-products-response";

export const mockProducts: GetProductsResponse[] = [
  {
    id: 1,
    title: "Casual T-Shirt",
    price: 29.99,
    description: "A comfortable casual t-shirt",
    category: "men's clothing",
    image: "https://example.com/image1.jpg",
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Formal Blazer",
    price: 89.99,
    description: "A stylish formal blazer",
    category: "men's clothing",
    image: "https://example.com/image2.jpg",
    rating: {
      rate: 4.8,
      count: 95,
    },
  },
];
