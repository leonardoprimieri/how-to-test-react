import { TestWrapper } from "@/test/test-wrapper";
import { afterEach, describe, expect, it } from "vitest";
import { ProductCategorySelector } from "../product-category-selector";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { categoriesMock } from "../../../tests/mocks/categories.mock";
import { interceptRoute } from "@/test/helpers/intercept-route";
import { makeApiEndpoint } from "@/config/api";
import { QueryClient } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { createWithMemoryHistoryWrapper } from "@/test/create-memory-history-test-wrapper";

const queryClient = new QueryClient();

describe("Product Category Selector", () => {
  function makeSut({ route }: { route?: string } = {}) {
    render(
      <TestWrapper route={route}>
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

  it("display clear button when a category is selected", async () => {
    makeSut();
    const categoryButton = await screen.findByRole("button", {
      name: categoriesMock.at(0),
    });

    await userEvent.click(categoryButton);

    const clearButton = await screen.findByRole("button", {
      name: "Clear",
    });

    expect(clearButton).toBeInTheDocument();
  });

  it("highlights the category when the button is selected", async () => {
    makeSut();
    const categoryButton = await screen.findByRole("button", {
      name: categoriesMock.at(0),
    });

    await userEvent.click(categoryButton);

    expect(categoryButton).toHaveAttribute("data-selected", "true");
  });

  it("highlight the category button that matches the url in the first render", async () => {
    makeSut({ route: `/products?category=${categoriesMock.at(0)}` });

    const categoryButton = await screen.findByRole("button", {
      name: categoriesMock.at(0),
    });

    expect(categoryButton).toHaveAttribute("data-selected", "true");
  });

  it("changes the url when a category is selected", async () => {
    const { Wrapper, history } = createWithMemoryHistoryWrapper();

    render(
      <Wrapper>
        <ProductCategorySelector />
      </Wrapper>
    );

    const categoryButton = await screen.findByRole("button", {
      name: categoriesMock.at(0),
    });

    await userEvent.click(categoryButton);

    expect(history.location.search).toBe(`?category=${categoriesMock.at(0)}`);
  });

  afterEach(() => {
    queryClient.clear();
    queryClient.removeQueries();
  });
});
