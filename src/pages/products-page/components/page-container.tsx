import type { ReactNode } from "react";

export function ProductsContainer({ children }: { children: ReactNode }) {
  return (
    <div className="container mt-12">
      {typeof children === "string" ? (
        <p className="text-center">{children}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {children}
        </div>
      )}
    </div>
  );
}
