import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductCatalog = forwardRef<HTMLElement>((_, ref) => {
  const [selectedProduct, setSelectedProduct] = useState<Tables<"products"> | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section ref={ref} className="py-20 bg-background relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full gradient-primary opacity-5" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full gradient-primary opacity-5" />

      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
            Наш ассортимент
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Каталог товаров
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Выберите товар для подробной информации
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full gradient-primary opacity-20 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              Каталог пока пуст. Товары скоро появятся!
            </p>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
});

ProductCatalog.displayName = "ProductCatalog";

export default ProductCatalog;
