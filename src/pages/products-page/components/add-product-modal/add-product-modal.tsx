import { ControlledInput } from "@/components/controlled-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { useAddProduct } from "./hooks/use-add-product";
import {
  addProductValidationSchema,
  type ProductFormValues,
} from "./validation/add-product-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(addProductValidationSchema),
    mode: "onSubmit",
    defaultValues: {
      category: "testt",
      description: "testt",
      image: "https://test.com",
      price: "300",
      title: "testt",
    },
  });

  const addProductMutation = useAddProduct();

  async function onSubmit(data: ProductFormValues) {
    await addProductMutation.mutateAsync(data, {
      onSuccess: () => {
        onClose();
        toast.success("Product successfully created", {
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("Error while creating the product", {
          position: "top-center",
        });
      },
    });
  }

  function onClose() {
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">Add New Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Product</DialogTitle>
          <DialogDescription className="mb-6">
            Fill the form below to add a new product to the database.
          </DialogDescription>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <ControlledInput<ProductFormValues>
                label="Product Name"
                name="title"
                placeholder="Type here..."
              />
              <ControlledInput<ProductFormValues>
                label="Product Description"
                name="description"
                placeholder="Type here..."
              />
              <ControlledInput<ProductFormValues>
                label="Product Category"
                name="category"
                placeholder="Type here..."
              />
              <ControlledInput<ProductFormValues>
                label="Product Image URL"
                name="image"
                placeholder="Type here..."
              />
              <ControlledInput<ProductFormValues>
                label="Product Price"
                name="price"
                placeholder="Type here..."
                type="number"
              />
              <DialogFooter className="gap-2">
                <Button onClick={onClose} variant="destructive">
                  Cancel
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="lg:w-32"
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
