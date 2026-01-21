import { Button } from "@/components/ui/button/button";
import { useGetCategories } from "./hooks/use-get-categories";
import { useNavigate, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

export function ProductCategorySelector() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const categoriesQuery = useGetCategories();

  function onSelectCategory(category: string) {
    navigate({
      search: `category=${category}`,
    });
  }

  function onClearCategory() {
    navigate({
      search: undefined,
    });
  }

  return (
    <div className="flex w-full gap-1 items-center">
      <h2 className="text-sm">Filter by category:</h2>
      {categoriesQuery.data?.map((category, index) => {
        const isSelected = selectedCategory === category;
        return (
          <Button
            variant="secondary"
            className={cn({
              "border-b-2 border-sky-400 rounded-none": isSelected,
            })}
            onClick={() => onSelectCategory(category)}
            key={index}
          >
            {category}
          </Button>
        );
      })}
      {!!selectedCategory && <Button onClick={onClearCategory}>Clear</Button>}
    </div>
  );
}
