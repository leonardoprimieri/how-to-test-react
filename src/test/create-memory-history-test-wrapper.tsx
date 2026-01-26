import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { UNSAFE_createMemoryHistory, Router } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function createWithMemoryHistoryWrapper(route = "/") {
  const history = UNSAFE_createMemoryHistory({
    initialEntries: [route],
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Router location={history.location} navigator={history}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Router>
    );
  }

  return { Wrapper, history };
}
