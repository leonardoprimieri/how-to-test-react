import { ProductsPage } from "@/pages/products-page/products-page";
import { TestWrapper } from "@/test/test-wrapper";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AddProductModal } from "../add-product-modal";

describe("Add Product Modal", () => {
  it("should be able to open the modal correctly", async () => {
    render(
      <TestWrapper>
        <ProductsPage />
      </TestWrapper>
    );

    const user = userEvent.setup();

    const addModalButton = await screen.findByRole("button", {
      name: "Add New Product",
    });

    await user.click(addModalButton);

    const modal = await screen.findByRole("dialog");

    expect(modal).toHaveAttribute("data-state", "open");
  });

  it.only("should not allow sending the form without required fields", async () => {
    render(
      <TestWrapper>
        <AddProductModal />
      </TestWrapper>
    );

    const user = userEvent.setup();

    const addModalButton = await screen.findByRole("button", {
      name: "Add New Product",
    });

    await user.click(addModalButton);

    const saveButton = await screen.findByRole("button", {
      name: "Save",
    });

    expect(saveButton).toBeDisabled();
  });

  it.only("enables the save button when the form is filled correctly", async () => {
    render(
      <TestWrapper>
        <AddProductModal />
      </TestWrapper>
    );

    const user = userEvent.setup();

    const addModalButton = await screen.findByRole("button", {
      name: "Add New Product",
    });

    await user.click(addModalButton);

    const FIELDS_AND_VALUES = [
      {
        name: "Name",
        value: "valid title",
      },
      {
        name: "Description",
        value: "valid description",
      },
      {
        name: "Image URL",
        value: "https://validurl.com",
      },
      {
        name: "Price",
        value: "200",
      },
      {
        name: "Category",
        value: "valid category",
      },
    ];

    for (const field of FIELDS_AND_VALUES) {
      const foundField = await screen.findByLabelText(field.name);

      await user.type(foundField, field.value);
    }

    const saveButton = await screen.findByRole("button", {
      name: "Save",
    });

    expect(saveButton).toBeEnabled();
  });
});
