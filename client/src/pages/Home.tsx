import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductCard from '@/components/ui/ProductCard';
import { Category, Product } from '@shared/schema';

const Home = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: featuredProducts } = useQuery<Product[]>({
    queryKey: ['/api/products?featured=true'],
  });

  const { data: newArrivals } = useQuery<Product[]>({
    queryKey: ['/api/products?newArrivals=true'],
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden pt-20">
        <div className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 bg-dark-900 opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/10 via-dark-900/30 to-dark-900"></div>
          
          {/* Animated background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,240,255,0.07),transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_80%,rgba(0,240,255,0.05),transparent_30%)]"></div>
          </div>
          
          {/* Accent lines */}
          <div className="absolute top-[20%] right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"></div>
          <div className="absolute bottom-[30%] left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"></div>
          
          <div className="container mx-auto px-6 z-10 pt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-2 inline-block">
                  <span className="text-xs uppercase tracking-widest text-neon-cyan/80">Luxury Footwear Collection</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-bold font-montserrat tracking-tight leading-none mb-4">
                  <span className="block">REDEFINE</span>
                  <span className="text-neon-cyan relative inline-block">
                    LUXURY
                    <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></span>
                  </span>
                </h2>
                <p className="text-light-300 md:text-lg mb-8 max-w-lg leading-relaxed">
                  Experience the perfect fusion of innovative design and premium craftsmanship with our exclusive limited-edition collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/shop" className="px-8 py-4 bg-neon-cyan text-dark-900 font-bold uppercase tracking-wider inline-block rounded-sm hover:bg-white transition-all duration-300 text-center">
                      Shop Collection
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/about" className="px-8 py-4 border border-light-100 text-light-100 font-bold uppercase tracking-wider inline-block rounded-sm hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 text-center">
                      Our Story
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative animate-float md:block hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {featuredProducts && featuredProducts.length > 0 && featuredProducts[0].imageUrls && (
                  <>
                    <div className="relative perspective">
                      <img 
                        src={featuredProducts[0].imageUrls[0]} 
                        alt={featuredProducts[0].name} 
                        className="w-full h-auto object-cover transform rotate-[-25deg] shadow-2xl rounded-lg border-2 border-neon-cyan/30"
                      />
                      {/* Glowing effect */}
                      <div className="absolute inset-0 rounded-lg opacity-50 rotate-[-25deg] shadow-[0_0_20px_rgba(0,240,255,0.5)] pointer-events-none"></div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-dark-700/80 backdrop-blur-sm p-4 rounded-md border border-neon-cyan/30">
                      <span className="text-neon-cyan font-bebas text-xl tracking-wider">${featuredProducts[0].price}</span>
                      <h3 className="text-light-100 font-medium tracking-wide">{featuredProducts[0].name.toUpperCase()}</h3>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="relative py-24 bg-dark-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold font-montserrat mb-6 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FEATURED <span className="text-neon-cyan">CATEGORIES</span>
              </motion.h2>
              <div className="flex space-x-3">
                <motion.button 
                  className="w-12 h-12 border border-light-300 rounded-full flex items-center justify-center hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </motion.button>
                <motion.button 
                  className="w-12 h-12 bg-neon-cyan text-dark-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </motion.button>
              </div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {categories?.map((category) => (
                <motion.div key={category.id} variants={fadeInUp}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* New Arrivals */}
        <div className="py-24 bg-dark-900">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-montserrat mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              NEW <span className="text-neon-cyan">ARRIVALS</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {newArrivals?.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/shop" 
                  className="px-8 py-4 border border-light-100 text-light-100 font-bold uppercase tracking-wider inline-block rounded-sm hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                >
                  View All Products
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
