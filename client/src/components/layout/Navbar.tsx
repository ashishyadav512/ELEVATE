import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're on the homepage, scroll to the section
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-lg border-b ${isScrolled ? 'border-dark-600' : 'border-transparent'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-montserrat tracking-wider text-light-100">
              ELEVATE<span className="text-neon-cyan">.</span>
            </h1>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" 
              className={`text-${location === '/' ? 'light-100 border-neon-cyan' : 'light-300 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-light-100 hover:border-neon-cyan transition-all duration-300`}>
              Home
            </Link>
            <Link href="/shop" 
              className={`text-${location === '/shop' ? 'light-100 border-neon-cyan' : 'light-300 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-light-100 hover:border-neon-cyan transition-all duration-300`}>
              Shop
            </Link>
            <Link href="/about" 
              className={`text-${location === '/about' ? 'light-100 border-neon-cyan' : 'light-300 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-light-100 hover:border-neon-cyan transition-all duration-300`}>
              About
            </Link>
            <Link href="/contact" 
              className={`text-${location === '/contact' ? 'light-100 border-neon-cyan' : 'light-300 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-light-100 hover:border-neon-cyan transition-all duration-300`}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-light-100 hover:text-neon-cyan transition-colors duration-300" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button className="p-2 text-light-100 hover:text-neon-cyan transition-colors duration-300 relative" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-neon-pink text-xs text-light-100 w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            <button 
              className="p-2 text-light-100 hover:text-neon-cyan transition-colors duration-300 md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-800 py-4 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className={`text-${location === '/' ? 'light-100' : 'light-300'} font-medium uppercase text-sm tracking-wider py-2 hover:text-neon-cyan`}>
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} className={`text-${location === '/shop' ? 'light-100' : 'light-300'} font-medium uppercase text-sm tracking-wider py-2 hover:text-neon-cyan`}>
                Shop
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`text-${location === '/about' ? 'light-100' : 'light-300'} font-medium uppercase text-sm tracking-wider py-2 hover:text-neon-cyan`}>
                About
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`text-${location === '/contact' ? 'light-100' : 'light-300'} font-medium uppercase text-sm tracking-wider py-2 hover:text-neon-cyan`}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
