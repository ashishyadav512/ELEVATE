import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Back to top button functionality
  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.getElementById("back-to-top");
      if (backToTopButton) {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.remove("hidden");
          backToTopButton.classList.add("flex");
        } else {
          backToTopButton.classList.remove("flex");
          backToTopButton.classList.add("hidden");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-dark-900 text-light-100 font-inter">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        
        {/* Back to Top Button */}
        <button 
          id="back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-neon-cyan text-dark-900 rounded-full hidden items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
        
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
