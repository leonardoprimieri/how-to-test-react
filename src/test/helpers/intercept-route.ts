import { http, HttpResponse } from "msw";
import { server } from "@/setupTests";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface InterceptRouteParams<T> {
  method: HttpMethod;
  url: string;
  response: T;
  status?: number;
}

export function interceptRoute<
  T extends object | null | undefined | string | number | boolean | unknown[]
>({ method, url, response, status = 200 }: InterceptRouteParams<T>) {
  server.use(
    http[method](url, () => {
      return HttpResponse.json(response, { status });
    })
  );
}
