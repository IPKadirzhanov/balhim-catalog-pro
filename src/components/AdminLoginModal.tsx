import { useState } from "react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AdminLoginModal = ({ open, onClose, onLogin }: AdminLoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      setError("");
      onLogin();
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl shadow-elevated p-8 w-full max-w-sm animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">Вход в панель</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <button
            type="submit"
            className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-card transition-all"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
