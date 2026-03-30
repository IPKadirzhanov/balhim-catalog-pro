import type { Tables } from "@/integrations/supabase/types";

interface ProductCardProps {
  product: Tables<"products">;
  onClick: (product: Tables<"products">) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₸";

  return (
    <div
      onClick={() => onClick(product)}
      className="group relative bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
      {/* Green circular overlay */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full gradient-primary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full gradient-primary opacity-10 group-hover:opacity-25 transition-opacity duration-300" />

      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full gradient-primary opacity-30" />
          </div>
        )}
        {/* Floating green circle on image */}
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full gradient-primary opacity-70 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 relative z-10">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-extrabold text-gradient-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground bg-accent px-3 py-1 rounded-full">
            Подробнее
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
