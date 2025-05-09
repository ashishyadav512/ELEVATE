import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cart, getTotalItems, getTotalPrice, removeFromCart } = useCart();
  const { searchQuery, setSearchQuery, performSearch, searchResults, clearSearch } = useSearch();
  const { data: products } = useQuery<Product[]>({ queryKey: ['/api/products'] });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close other menus when opening this one
    if (!isMenuOpen) {
      setIsSearchOpen(false);
      setIsCartOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close other menus when opening this one
    if (!isSearchOpen) {
      setIsMenuOpen(false);
      setIsCartOpen(false);
      
      // Focus on the search input when opening
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      clearSearch();
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Close other menus when opening this one
    if (!isCartOpen) {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };
  
  const handleSearch = () => {
    if (products) {
      performSearch(products);
    }
  };

  // Handle search on enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b ${isScrolled ? 'border-gray-800' : 'border-transparent'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-montserrat tracking-wider text-gray-100">
              ELEVATE<span className="text-cyan-400">.</span>
            </h1>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" 
              className={`${location === '/' ? 'text-gray-100 border-cyan-400' : 'text-gray-400 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-gray-100 hover:border-cyan-400 transition-all duration-300`}>
              Home
            </Link>
            <Link href="/shop" 
              className={`${location === '/shop' ? 'text-gray-100 border-cyan-400' : 'text-gray-400 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-gray-100 hover:border-cyan-400 transition-all duration-300`}>
              Shop
            </Link>
            <Link href="/about" 
              className={`${location === '/about' ? 'text-gray-100 border-cyan-400' : 'text-gray-400 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-gray-100 hover:border-cyan-400 transition-all duration-300`}>
              About
            </Link>
            <Link href="/contact" 
              className={`${location === '/contact' ? 'text-gray-100 border-cyan-400' : 'text-gray-400 border-transparent'} font-medium uppercase text-sm tracking-wider pb-1 border-b-2 hover:text-gray-100 hover:border-cyan-400 transition-all duration-300`}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 ${isSearchOpen ? 'text-cyan-400' : 'text-gray-100'} hover:text-cyan-400 transition-colors duration-300`} 
              onClick={toggleSearch} 
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button 
              className={`p-2 ${isCartOpen ? 'text-cyan-400' : 'text-gray-100'} hover:text-cyan-400 transition-colors duration-300 relative`}
              onClick={toggleCart} 
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs text-gray-100 w-4 h-4 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button 
              className={`p-2 ${isMenuOpen ? 'text-cyan-400' : 'text-gray-100'} hover:text-cyan-400 transition-colors duration-300 md:hidden`}
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

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="bg-gray-900 py-4 animate-fadeIn shadow-lg border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for products..."
                  className="flex-grow py-2 px-4 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button 
                  onClick={handleSearch}
                  className="px-4 py-2 bg-cyan-400 text-gray-900 rounded-md hover:bg-cyan-300 transition-colors"
                >
                  Search
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="max-h-80 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          clearSearch();
                        }}
                        className="flex gap-3 p-2 hover:bg-gray-800 rounded transition-colors"
                      >
                        {product.imageUrls && product.imageUrls.length > 0 && (
                          <img 
                            src={product.imageUrls[0]} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-100">{product.name}</h3>
                          <p className="text-cyan-400">${product.salePrice || product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && (
                <div className="py-8 text-center text-gray-400">
                  No products found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="bg-gray-900 py-4 animate-fadeIn shadow-lg border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold mb-4">Your Cart</h2>
              
              {cart.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <div className="max-h-80 overflow-y-auto space-y-4 mb-4">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4 pb-4 border-b border-gray-800">
                        {item.product.imageUrls && item.product.imageUrls.length > 0 && (
                          <img 
                            src={item.product.imageUrls[0]} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <p className="text-cyan-400 font-medium mt-1">
                            ${(item.product.salePrice || item.product.price) * item.quantity}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-cyan-400">
                        ${cart.reduce((total, item) => {
                          const price = item.product.salePrice || item.product.price;
                          return total + (price * item.quantity);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="flex-grow py-2 px-4 text-center bg-cyan-400 text-gray-900 font-medium rounded hover:bg-cyan-300 transition-colors"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} 
                className={`${location === '/' ? 'text-gray-100' : 'text-gray-400'} font-medium uppercase text-sm tracking-wider py-2 hover:text-cyan-400`}>
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} 
                className={`${location === '/shop' ? 'text-gray-100' : 'text-gray-400'} font-medium uppercase text-sm tracking-wider py-2 hover:text-cyan-400`}>
                Shop
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} 
                className={`${location === '/about' ? 'text-gray-100' : 'text-gray-400'} font-medium uppercase text-sm tracking-wider py-2 hover:text-cyan-400`}>
                About
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} 
                className={`${location === '/contact' ? 'text-gray-100' : 'text-gray-400'} font-medium uppercase text-sm tracking-wider py-2 hover:text-cyan-400`}>
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
