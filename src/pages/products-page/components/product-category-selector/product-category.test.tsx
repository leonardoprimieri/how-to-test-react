import { TestWrapper } from "@/test/test-wrapper";
import { afterEach, describe, expect, it } from "vitest";
import { ProductCategorySelector } from "./product-category-selector";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { categoriesMock } from "../../tests/mocks/categories.mock";
import { interceptRoute } from "@/test/helpers/intercept-route";
import { makeApiEndpoint } from "@/config/api";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Product Category Selector", () => {
  function makeSut() {
    render(
      <TestWrapper>
        <ProductCategorySelector />
      </TestWrapper>
    );
  }

  it("does not render category buttons when API returns an empty list", async () => {
    interceptRoute({
      method: "get",
      response: [],
      url: makeApiEndpoint("/products/categories"),
    });

    makeSut();

    await waitFor(async () => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  it("renders the category filter title", async () => {
    makeSut();

    const title = await screen.findByRole("heading", {
      name: "Filter by category:",
    });

    expect(title).toBeInTheDocument();
  });

  it("renders category buttons from the API response", async () => {
    makeSut();

    for (const category of categoriesMock) {
      expect(
        await screen.findByRole("button", { name: category })
      ).toBeInTheDocument();
    }
  });

  afterEach(() => {
    queryClient.clear();
    queryClient.removeQueries();
  });
});
