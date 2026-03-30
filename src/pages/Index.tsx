import { useRef, useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdminLoginModal from "@/components/AdminLoginModal";
import AdminPanel from "@/components/AdminPanel";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "admin@balhim.local";
const ADMIN_PASSWORD = "admin123secure";

const Index = () => {
  const catalogRef = useRef<HTMLElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAdminLogin = async () => {
    // Sign in to Supabase so RLS allows writes
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (signInError) {
        // If user doesn't exist, create it
        const { error: signUpError } = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });
        if (signUpError) {
          console.error("Admin auth error:", signUpError);
        }
        // Try signing in again
        await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });
      }
    } catch (e) {
      console.error("Auth error:", e);
    }

    setShowLoginModal(false);
    setShowAdmin(true);
  };

  const handleAdminClose = async () => {
    await supabase.auth.signOut();
    setShowAdmin(false);
  };

  if (showAdmin) {
    return <AdminPanel onClose={handleAdminClose} />;
  }

  return (
    <div className="min-h-screen pt-16">
      <Header onTripleClick={() => setShowLoginModal(true)} />
      <HeroSection onScrollToCatalog={scrollToCatalog} />
      <ProductCatalog ref={catalogRef} />
      <ContactSection />
      <Footer />
      <AdminLoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
};

export default Index;
