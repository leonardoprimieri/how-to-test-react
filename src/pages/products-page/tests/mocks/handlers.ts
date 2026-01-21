import { http, HttpResponse, delay } from "msw";
import { productsMock } from "./products.mock";
import { categoriesMock } from "./categories.mock";

export const handlers = [
  http.get("https://fakestoreapi.com/products", async () => {
    await delay(100);
    return HttpResponse.json(productsMock);
  }),
  http.get("https://fakestoreapi.com/products/categories", async () => {
    await delay(100);
    return HttpResponse.json(categoriesMock);
  }),
];
