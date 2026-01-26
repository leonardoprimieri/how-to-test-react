import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function TestWrapper({
  children,
  route = "/",
}: {
  children: ReactNode;
  route?: string;
}) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
}
