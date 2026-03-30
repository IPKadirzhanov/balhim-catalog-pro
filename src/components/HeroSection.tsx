import heroImage from "@/assets/hero-products.jpg";

const HeroSection = ({ onScrollToCatalog }: { onScrollToCatalog: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text content */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
            <span className="h-2 w-2 rounded-full gradient-primary" />
            Добро пожаловать
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
            Хим и хоз товары{" "}
            <span className="text-gradient-primary">в Алматы</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md">
            Качественные товары по доступным ценам. Широкий ассортимент бытовой химии и хозяйственных товаров.
          </p>
          <button
            onClick={onScrollToCatalog}
            className="gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-elevated hover:shadow-card transition-all duration-300 hover:-translate-y-1"
          >
            Смотреть каталог
          </button>
        </div>

        {/* Hero image with green circular overlays */}
        <div className="relative flex justify-center items-center" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            {/* Large green circle behind image */}
            <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full gradient-primary opacity-20 blur-sm" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full gradient-primary opacity-30" />
            
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated w-full max-w-lg">
              <img
                src={heroImage}
                alt="Хим и хоз товары BalHim"
                className="w-full h-auto object-cover"
              />
              {/* Green semi-circular overlay on image */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full gradient-primary opacity-60 translate-x-8 -translate-y-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full gradient-primary opacity-40 -translate-x-6 translate-y-6" />
            </div>

            {/* Small floating circle */}
            <div className="absolute top-1/2 -right-16 w-12 h-12 rounded-full border-4 border-primary opacity-60" />
          </div>
        </div>
      </div>

      {/* Background decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full gradient-primary opacity-5" />
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full gradient-primary opacity-5" />
    </section>
  );
};

export default HeroSection;
