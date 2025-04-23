import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModeToggle } from "@/components/theme/mode-toggle";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/40">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;