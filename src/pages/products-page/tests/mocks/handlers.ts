import { http, HttpResponse, delay } from "msw";
import { mockProducts } from "./products.mock";

export const handlers = [
  http.get("https://fakestoreapi.com/products", async () => {
    await delay(100);
    return HttpResponse.json(mockProducts);
  }),
];
