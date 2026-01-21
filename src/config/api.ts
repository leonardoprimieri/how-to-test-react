const API_URL = "https://fakestoreapi.com";

export function makeApiEndpoint(path: string) {
  return API_URL.concat(path);
}
