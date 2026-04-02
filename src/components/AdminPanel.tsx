import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const CATEGORIES = [
  "Для кухни",
  "Для мебели",
  "Для одежды",
  "Салфетки",
  "Пакеты",
  "Рабочие перчатки",
  "Другое",
];

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Tables<"products"> | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "Другое" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = editingProduct?.image || null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: imageUrl,
        category: formData.category,
      };

      if (editingProduct) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "Другое" });
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  const startEdit = (product: Tables<"products">) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category: (product as any).category || "Другое",
    });
    setShowForm(true);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₸";

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold text-foreground">
            Панель управления
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowForm(true); setEditingProduct(null); setFormData({ name: "", description: "", price: "", category: "Другое" }); }}
              className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-card transition-all"
            >
              + Добавить товар
            </button>
            <button
              onClick={onClose}
              className="bg-secondary text-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-accent transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-card rounded-2xl shadow-card p-6 mb-8 space-y-4">
            <h2 className="font-bold text-lg text-foreground">
              {editingProduct ? "Редактировать товар" : "Новый товар"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Название"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="Цена (₸)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Описание"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="text-sm text-muted-foreground"
            />
            <div className="flex gap-3">
              <button
                onClick={() => saveMutation.mutate()}
                disabled={!formData.name || !formData.price || saveMutation.isPending}
                className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 hover:shadow-card transition-all"
              >
                {saveMutation.isPending ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                onClick={resetForm}
                className="bg-secondary text-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-accent transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Products table */}
        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground">Загрузка...</div>
        ) : (
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Фото</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Название</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Категория</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Цена</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        {product.image ? (
                          <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-accent" />
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {(product as any).category || "Другое"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-sm text-primary font-semibold hover:underline"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(product.id)}
                          className="text-sm text-destructive font-semibold hover:underline"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(!products || products.length === 0) && (
              <div className="text-center py-10 text-muted-foreground">Нет товаров</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
