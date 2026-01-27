import { Button } from "@/components/ui/button";
import { useGetCategories } from "./hooks/use-get-categories";
import { useNavigate, useSearchParams } from "react-router";

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

  if (!categoriesQuery.data?.length) return <></>;

  return (
    <div className="mt-4 flex w-full flex-wrap gap-3 items-center">
      <h2 className="text-sm">Filter by category:</h2>
      {categoriesQuery.data?.map((category, index) => {
        const isSelected = selectedCategory === category;
        return (
          <Button
            variant={isSelected ? "default" : "secondary"}
            onClick={() => onSelectCategory(category)}
            key={index}
            data-selected={isSelected ? "true" : undefined}
          >
            {category}
          </Button>
        );
      })}
      {!!selectedCategory && (
        <Button variant="destructive" onClick={onClearCategory}>
          Clear
        </Button>
      )}
    </div>
  );
}
