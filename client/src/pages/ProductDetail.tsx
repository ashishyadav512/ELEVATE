import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Product } from '@shared/schema';
import ProductViewer3D from '@/components/ui/ProductViewer3D';
import SizeSelector from '@/components/ui/SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  // Set default color when product loads
  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    // Add the product to the cart with selected options
    addToCart(
      product, 
      quantity, 
      selectedSize, 
      selectedColor || ''
    );

    toast({
      title: "Added to Cart",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-24 bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-light-300 mb-6">We couldn't find the product you're looking for.</p>
          <Link href="/shop">
            <a className="px-6 py-3 bg-cyan-400 text-dark-900 font-bold uppercase rounded-sm hover:bg-white transition-all duration-300">
              Back to Shop
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section id="product-detail" className="pt-24 pb-24 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
          {/* Product Images */}
          <div className="md:w-1/2">
            <ProductViewer3D images={product.imageUrls || []} />
            
            <div className="grid grid-cols-4 gap-2">
              {(product.imageUrls || []).map((image, index) => (
                <button 
                  key={index}
                  className={`h-24 bg-dark-700 rounded overflow-hidden ${index === selectedImageIndex ? 'border-2 border-neon-cyan' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark-700 rounded-lg p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2 font-montserrat">{product.name.toUpperCase()}</h1>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      <path fill="none" d="M12,2 L12,17.77"></path>
                      <path fill="gray" d="M12,17.77 L5.82,21.02 L7,14.14 L2,9.27 L8.91,8.26 L12,2 L12,17.77"></path>
                    </svg>
                  </div>
                  <span className="text-light-300 ml-2">4.7 (142 Reviews)</span>
                </div>
                {product.salePrice ? (
                  <div>
                    <p className="text-light-300 text-sm line-through">${product.price}</p>
                    <p className="text-green-400 font-bebas text-3xl">${product.salePrice}</p>
                  </div>
                ) : (
                  <p className="text-cyan-400 font-bebas text-3xl">${product.price}</p>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-light-300">
                  {product.description}
                </p>
              </div>
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">SELECT COLOR</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => {
                      const colorMap: Record<string, string> = {
                        black: '#000000',
                        white: '#FFFFFF',
                        red: '#DC2626',
                        blue: '#2563EB',
                        green: '#16A34A',
                        yellow: '#F59E0B',
                        purple: '#7C3AED',
                        pink: '#DB2777',
                        gray: '#6B7280',
                      };
                      
                      return (
                        <button 
                          key={color}
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${selectedColor === color ? 'border-cyan-400' : 'border-dark-600 hover:border-cyan-400'}`}
                          style={{ backgroundColor: colorMap[color] || color }}
                          onClick={() => handleColorSelect(color)}
                          aria-label={`Select ${color} color`}
                        >
                          {selectedColor === color && (
                            <svg xmlns="http://www.w3.org/2000/svg" 
                              className={`h-6 w-6 ${['white', 'yellow'].includes(color) ? 'text-dark-900' : 'text-neon-cyan'}`} 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {product.sizes && product.sizes.length > 0 && (
                <SizeSelector 
                  sizes={product.sizes} 
                  onChange={handleSizeChange} 
                />
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex border border-dark-600 rounded-sm">
                  <button 
                    className="px-4 py-2 text-light-100 border-r border-dark-600"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly
                    className="w-12 bg-transparent text-center text-light-100 focus:outline-none" 
                  />
                  <button 
                    className="px-4 py-2 text-light-100 border-l border-dark-600"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                </div>
                <motion.button 
                  className="flex-1 py-3 bg-cyan-400 text-dark-900 font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all duration-300"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button 
                  className="w-12 h-12 border border-dark-600 rounded-sm flex items-center justify-center text-light-300 hover:text-cyan-400 hover:border-neon-cyan"
                  whileHover={{ borderColor: "#00F0FF", color: "#00F0FF" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Add to wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </motion.button>
              </div>
              
              <div className="border-t border-dark-600 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"></path>
                      <path d="M10.3 22a9.9 9.9 0 0 1-2-2 10 10 0 1 1 7.4 0 9.9 9.9 0 0 1-2 2"></path>
                      <path d="M14 13h4"></path>
                      <path d="M6 13h4"></path>
                    </svg>
                    <span className="text-light-300 text-sm">Free shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m2 12 4-4v3h16v2H6v3z"></path>
                    </svg>
                    <span className="text-light-300 text-sm">30-day returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                    <span className="text-light-300 text-sm">2-year warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-dark-600">
            <div className="flex flex-wrap -mb-px">
              <button 
                className={`px-6 py-3 border-b-2 ${selectedTab === 'description' ? 'border-neon-cyan text-light-100' : 'border-transparent text-light-300 hover:text-light-100'}`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 border-b-2 ${selectedTab === 'features' ? 'border-cyan-400 text-light-100' : 'border-transparent text-light-300 hover:text-light-100'}`}
                onClick={() => setSelectedTab('features')}
              >
                Features
              </button>
              <button 
                className={`px-6 py-3 border-b-2 ${selectedTab === 'reviews' ? 'border-cyan-400 text-light-100' : 'border-transparent text-light-300 hover:text-light-100'}`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reviews (142)
              </button>
              <button 
                className={`px-6 py-3 border-b-2 ${selectedTab === 'shipping' ? 'border-cyan-400 text-light-100' : 'border-transparent text-light-300 hover:text-light-100'}`}
                onClick={() => setSelectedTab('shipping')}
              >
                Shipping
              </button>
            </div>
          </div>
          
          <div className="py-8">
            {selectedTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">PRODUCT DETAILS</h3>
                  <ul className="text-light-300 space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Breathable engineered mesh upper with synthetic overlays</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Responsive foam midsole cushioning system</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Carbon fiber plate for enhanced energy return</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Durable rubber outsole with multi-directional traction pattern</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Reflective accents for visibility in low light</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 h-5 w-5 mt-1 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Heel pull tab for easy on and off</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">TECHNICAL SPECIFICATIONS</h3>
                  <div className="space-y-3 text-light-300">
                    <div className="flex justify-between py-2 border-b border-dark-600">
                      <span>Weight</span>
                      <span className="text-light-100">9.5 oz (270g)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-600">
                      <span>Drop</span>
                      <span className="text-light-100">8mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-600">
                      <span>Upper Material</span>
                      <span className="text-light-100">Engineered Mesh</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-600">
                      <span>Midsole</span>
                      <span className="text-light-100">Responsive Foam</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-600">
                      <span>Outsole</span>
                      <span className="text-light-100">High-Traction Rubber</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Style</span>
                      <span className="text-light-100">Performance Running</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'features' && (
              <div className="text-light-300 space-y-6">
                <p>The {product.name} combines cutting-edge technology with luxurious materials to deliver unmatched performance and style. Our innovative design team has pushed the boundaries of what's possible in premium footwear.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-dark-700 p-5 rounded-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v0c0-3.9-3.1-7-7-7h-.7c.5-.5.7-1.2.7-2z"></path>
                        <path d="M3 21h18"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Superior Comfort</h4>
                    <p className="text-light-300 text-sm">Our proprietary cushioning system adapts to your stride, providing the perfect balance of support and responsiveness.</p>
                  </div>
                  
                  <div className="bg-dark-700 p-5 rounded-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Sustainable Materials</h4>
                    <p className="text-light-300 text-sm">Crafted with eco-friendly materials without compromising on quality or performance.</p>
                  </div>
                  
                  <div className="bg-dark-700 p-5 rounded-lg">
                    <div className="text-cyan-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 3a2 2 0 0 0-2 2"></path>
                        <path d="M19 3a2 2 0 0 1 2 2"></path>
                        <path d="M21 19a2 2 0 0 1-2 2"></path>
                        <path d="M5 21a2 2 0 0 1-2-2"></path>
                        <path d="M9 3h1"></path>
                        <path d="M9 21h1"></path>
                        <path d="M14 3h1"></path>
                        <path d="M14 21h1"></path>
                        <path d="M3 9v1"></path>
                        <path d="M21 9v1"></path>
                        <path d="M3 14v1"></path>
                        <path d="M21 14v1"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Performance Engineering</h4>
                    <p className="text-light-300 text-sm">Every element designed with precision to enhance your performance and support natural movement.</p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 bg-dark-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          <path fill="none" d="M12,2 L12,17.77"></path>
                          <path fill="gray" d="M12,17.77 L5.82,21.02 L7,14.14 L2,9.27 L8.91,8.26 L12,2 L12,17.77"></path>
                        </svg>
                      </div>
                      <span className="text-xl font-semibold">4.7 out of 5</span>
                    </div>
                    <p className="text-light-300 mb-4">Based on 142 reviews</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-light-300">5 stars</span>
                        <div className="flex-1 h-2 mx-2 bg-dark-600 rounded-full">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm text-light-300">70%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-light-300">4 stars</span>
                        <div className="flex-1 h-2 mx-2 bg-dark-600 rounded-full">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm text-light-300">20%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-light-300">3 stars</span>
                        <div className="flex-1 h-2 mx-2 bg-dark-600 rounded-full">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm text-light-300">5%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-light-300">2 stars</span>
                        <div className="flex-1 h-2 mx-2 bg-dark-600 rounded-full">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '3%' }}></div>
                        </div>
                        <span className="text-sm text-light-300">3%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm text-light-300">1 star</span>
                        <div className="flex-1 h-2 mx-2 bg-dark-600 rounded-full">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '2%' }}></div>
                        </div>
                        <span className="text-sm text-light-300">2%</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 px-4 py-2 border border-neon-cyan text-cyan-400 rounded-sm hover:bg-cyan-400 hover:text-dark-900 transition-all duration-300">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="space-y-6">
                      <div className="bg-dark-700 p-6 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">Michael T.</h4>
                          <div className="flex text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                        </div>
                        <p className="text-light-300 text-sm mb-2">Verified Purchase - March 15, 2023</p>
                        <h5 className="font-medium mb-2">Absolutely incredible!</h5>
                        <p className="text-light-300">These shoes exceeded my expectations in every way. The comfort is unmatched and the style is perfect for both athletic activities and casual wear. Worth every penny!</p>
                      </div>
                      
                      <div className="bg-dark-700 p-6 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">Sarah L.</h4>
                          <div className="flex text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                        </div>
                        <p className="text-light-300 text-sm mb-2">Verified Purchase - February 28, 2023</p>
                        <h5 className="font-medium mb-2">Great shoes, runs slightly small</h5>
                        <p className="text-light-300">I love these shoes! The quality is fantastic and they look even better in person. Just a heads up, they run a bit small so consider ordering half a size up.</p>
                      </div>
                      
                      <div className="bg-dark-700 p-6 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">David K.</h4>
                          <div className="flex text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                        </div>
                        <p className="text-light-300 text-sm mb-2">Verified Purchase - January 12, 2023</p>
                        <h5 className="font-medium mb-2">Best running shoes I've ever owned</h5>
                        <p className="text-light-300">I've tried countless running shoes over the years, and these are by far the best. The support is perfect, and my feet don't get tired even after long runs. Highly recommend to serious runners.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <button className="px-6 py-2 border border-light-300 text-light-300 rounded-sm hover:border-neon-cyan hover:text-cyan-400 transition-all duration-300">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'shipping' && (
              <div className="space-y-6 text-light-300">
                <div className="bg-dark-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Free Standard Shipping</h4>
                      <p>Orders over $100 qualify for free standard shipping. Expected delivery within 5-7 business days.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Expedited Shipping</h4>
                      <p>Need your order faster? Select expedited shipping at checkout for delivery within 2-3 business days. Additional fees apply.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">International Orders</h4>
                      <p>We ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees may apply.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">Returns & Exchanges</h3>
                  <div className="space-y-4">
                    <p>We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we offer a 30-day return policy.</p>
                    <div>
                      <h4 className="font-medium mb-2">Return Policy Highlights:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Items must be unworn and in original condition with all tags attached</li>
                        <li>Return shipping is free for orders within the United States</li>
                        <li>Exchanges are processed quickly to get you the right size or color</li>
                        <li>Refunds are typically processed within 5-7 business days after we receive your return</li>
                      </ul>
                    </div>
                    <p>For detailed instructions on how to initiate a return or exchange, please visit our <a href="#" className="text-cyan-400 hover:underline">Returns & Exchanges</a> page.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-montserrat mb-8">
            YOU MAY ALSO <span className="text-cyan-400">LIKE</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Related products will be dynamically loaded here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
