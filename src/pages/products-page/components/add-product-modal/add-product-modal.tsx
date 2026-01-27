import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddProductModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-max">Add New Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Product</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new product to the database.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
