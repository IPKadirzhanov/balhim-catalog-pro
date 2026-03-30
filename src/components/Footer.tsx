const Footer = () => {
  return (
    <footer className="bg-foreground py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-extrabold text-primary-foreground">
            Bal<span className="text-primary">Him</span>
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BalHim. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
