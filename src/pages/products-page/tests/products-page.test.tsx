import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductsPage } from "../products-page";
import { TestWrapper } from "@/test/test-wrapper";
import { interceptRoute } from "@/test/helpers/intercept-route";

describe("Products Page", () => {
  function makeSut() {
    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );
  }

  it("should render the page title", async () => {
    makeSut();
    const heading = await screen.findByRole("heading", { name: "Products" });
    expect(heading).toBeInTheDocument();
  });

  it("should render skeleton if the products are loading", async () => {
    makeSut();
    const loadingText = screen.getAllByText(/loading products/i);
    expect(loadingText.length).toBeGreaterThan(0);
  });

  it("should render the products list from API", async () => {
    makeSut();
    const productTitle = await screen.findByRole("heading", {
      name: /casual t-shirt/i,
    });
    expect(productTitle).toBeInTheDocument();
  });

  it("should render empty message if api returns an empty array", async () => {
    interceptRoute({
      method: "get",
      url: "https://fakestoreapi.com/products",
      response: [],
    });

    makeSut();

    const emptyMessage = await screen.findByText(/no products found/i);

    expect(emptyMessage).toBeInTheDocument();
  });

  it("should render error if api returns an error", async () => {
    interceptRoute({
      method: "get",
      url: "https://fakestoreapi.com/products",
      response: { message: "Internal Server Error" },
      status: 500,
    });

    makeSut();

    const errorMessage = await screen.findByText(
      /there was an error fetching the products/i
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
