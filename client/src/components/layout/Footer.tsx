import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-dark-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-6">
              ELEVATE<span className="text-neon-cyan">.</span>
            </h3>
            <p className="text-light-300 mb-6">
              Premium footwear designed for performance, style, and comfort. Elevate your game with our exclusive collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-300 hover:text-neon-cyan transition-colors duration-300" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-light-300 hover:text-neon-cyan transition-colors duration-300" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-light-300 hover:text-neon-cyan transition-colors duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-light-300 hover:text-neon-cyan transition-colors duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                  <polygon points="10 15 15 12 10 9"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3 text-light-300">
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">Men's Shoes</Link></li>
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">Women's Shoes</Link></li>
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">Limited Editions</Link></li>
              <li><Link href="/shop" className="hover:text-neon-cyan transition-colors duration-300">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-3 text-light-300">
              <li><Link href="/about" className="hover:text-neon-cyan transition-colors duration-300">Our Story</Link></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Sustainability</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Technology</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Press</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3 text-light-300">
              <li><Link href="/contact" className="hover:text-neon-cyan transition-colors duration-300">Contact Us</Link></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">FAQs</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Track Order</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors duration-300">Gift Cards</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ELEVATE. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-light-300">
              <a href="#" className="hover:text-neon-cyan transition-colors duration-300">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-neon-cyan transition-colors duration-300">Terms of Service</a>
              <span>|</span>
              <a href="#" className="hover:text-neon-cyan transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
