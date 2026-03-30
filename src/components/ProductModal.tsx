import type { Tables } from "@/integrations/supabase/types";
import { useEffect } from "react";

interface ProductModalProps {
  product: Tables<"products"> | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₸";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" style={{ animationDuration: "0.2s" }} />

      {/* Modal */}
      <div
        className="relative bg-card rounded-3xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Green decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full gradient-primary opacity-15" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full gradient-primary opacity-10" />

        {/* Image */}
        <div className="relative h-72 md:h-96 rounded-t-3xl overflow-hidden bg-secondary">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center gradient-primary opacity-20" />
          )}
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full gradient-primary opacity-50" />
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="text-3xl font-extrabold text-gradient-primary">
            {formatPrice(product.price)}
          </div>

          <a
            href="tel:+77752400997"
            className="flex items-center justify-center gap-3 w-full gradient-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Позвонить
          </a>

          <p className="text-center text-sm text-muted-foreground">
            +7 747 948 13 18
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
