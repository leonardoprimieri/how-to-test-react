import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsPage } from "./pages/products-page/products-page.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/" index element={<App />} />
        <Route path="/products" index element={<ProductsPage />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);
