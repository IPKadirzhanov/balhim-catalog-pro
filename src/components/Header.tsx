import { useRef } from "react";

interface HeaderProps {
  onTripleClick: () => void;
}

const Header = ({ onTripleClick }: HeaderProps) => {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onTripleClick();
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <span
          onClick={handleLogoClick}
          className="text-2xl font-extrabold cursor-pointer select-none text-foreground"
        >
          Bal<span className="text-primary">Him</span>
        </span>
        <a
          href="tel:+77479481318"
          className="gradient-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold text-sm hover:shadow-card transition-all"
        >
          Позвонить
        </a>
      </div>
    </header>
  );
};

export default Header;
