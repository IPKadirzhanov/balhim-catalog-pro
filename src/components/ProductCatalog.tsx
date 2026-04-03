import { useState, useMemo, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "Все",
  "Для кухни",
  "Для мебели",
  "Для одежды",
  "Салфетки",
  "Пакеты",
  "Рабочие перчатки",
  "Гигиена",
  "Другое",
] as const;

type SortOption = "default" | "price_asc" | "price_desc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "По умолчанию",
  price_asc: "Сначала дешёвые",
  price_desc: "Сначала дорогие",
};

const ProductCatalog = forwardRef<HTMLElement>((_, ref) => {
  const [selectedProduct, setSelectedProduct] = useState<Tables<"products"> | null>(null);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

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

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Category filter
    if (activeCategory !== "Все") {
      result = result.filter((p) => (p as any).category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, searchQuery, sortOption]);

  return (
    <section ref={ref} className="py-20 bg-background relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full gradient-primary opacity-5" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full gradient-primary opacity-5" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
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

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border bg-card text-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              onBlur={() => setTimeout(() => setShowSortDropdown(false), 150)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-border bg-card text-foreground shadow-card hover:shadow-elevated transition-all whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{SORT_LABELS[sortOption]}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-elevated border border-border z-20 min-w-[200px] overflow-hidden animate-fade-in" style={{ animationDuration: "0.15s" }}>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSortOption(key); setShowSortDropdown(false); }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-accent ${sortOption === key ? "text-primary font-semibold bg-accent/50" : "text-foreground"}`}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide animate-fade-in">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeCategory === cat
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-card"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full gradient-primary opacity-20 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              {searchQuery || activeCategory !== "Все"
                ? "Ничего не найдено. Попробуйте изменить фильтры."
                : "Каталог пока пуст. Товары скоро появятся!"}
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
