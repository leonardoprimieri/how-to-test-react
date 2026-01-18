import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductsPage } from "../products-page";
import { TestWrapper } from "@/test/test-wrapper";
import { server } from "@/setupTests";
import { http, HttpResponse } from "msw";

describe("Products Page", () => {
  it("should render the page title", () => {
    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );
    const heading = screen.getByRole("heading", { name: /products/i });
    expect(heading).toBeDefined();
  });

  it("should render skeleton if the products are loading", async () => {
    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );
    const loadingText = screen.getAllByText(/loading products/i);
    expect(loadingText.length).toBeGreaterThan(0);
  });

  it("should render the products list from API", async () => {
    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );
    const productTitle = await screen.findByRole("heading", {
      name: /casual t-shirt/i,
    });
    expect(productTitle).toBeInTheDocument();
  });

  it("should render empty message if api returns an empty array", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products", () => {
        return HttpResponse.json([]);
      })
    );

    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );

    const emptyMessage = await screen.findByText(/no products found/i);

    expect(emptyMessage).toBeInTheDocument();
  });
});
