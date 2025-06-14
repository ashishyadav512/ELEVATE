import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Category, Product } from '@shared/schema';
import FilterSidebar from '@/components/ui/FilterSidebar';
import ProductCard from '@/components/ui/ProductCard';

const Shop = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 450]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('featured');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    if (products) {
      let filtered = [...products];
      
      // Apply category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.categoryId || 0));
      }
      
      // Apply price filter
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      });
      
      // Apply color filter
      if (selectedColors.length > 0) {
        filtered = filtered.filter(product => 
          product.colors?.some(color => selectedColors.includes(color))
        );
      }
      
      // Apply size filter
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(product => 
          product.sizes?.some(size => selectedSizes.includes(size))
        );
      }
      
      // Apply sorting
      if (sortOption === 'price-low') {
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      } else if (sortOption === 'price-high') {
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      } else if (sortOption === 'newest') {
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }
      
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [products, selectedCategories, priceRange, selectedColors, selectedSizes, sortOption]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const applyFilters = () => {
    // Filters are already applied via useEffect
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([50, 450]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortOption('featured');
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="shop" className="pt-24 pb-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            OUR <span className="text-cyan-400">COLLECTION</span>
          </h2>
          <p className="text-gray-300 max-w-2xl">
            Browse our premium selection of footwear designed for performance, style, and comfort. Filter by your preferences to find your perfect pair.
          </p>
        </motion.div>
        
        {/* Filters and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {categories && (
            <FilterSidebar 
              categories={categories}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              selectedColors={selectedColors}
              selectedSizes={selectedSizes}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onColorChange={handleColorChange}
              onSizeChange={handleSizeChange}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
            />
          )}
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sorting Options */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-4 bg-gray-800 rounded-lg">
              <div className="mb-4 md:mb-0">
                <span className="text-gray-300">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex border border-gray-700 rounded-sm overflow-hidden">
                  <button 
                    className={`px-4 py-2 ${displayMode === 'grid' ? 'bg-gray-700 text-gray-100' : 'text-gray-300 hover:text-gray-100'}`}
                    onClick={() => setDisplayMode('grid')}
                    aria-label="Grid view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    </svg>
                  </button>
                  <button 
                    className={`px-4 py-2 ${displayMode === 'list' ? 'bg-gray-700 text-gray-100' : 'text-gray-300 hover:text-gray-100'}`}
                    onClick={() => setDisplayMode('list')}
                    aria-label="List view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" x2="21" y1="6" y2="6"></line>
                      <line x1="3" x2="21" y1="12" y2="12"></line>
                      <line x1="3" x2="21" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <select 
                  className="bg-gray-800 border border-gray-700 text-gray-100 rounded-sm px-4 py-2 focus:ring-cyan-400 focus:border-cyan-400"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-4">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-200 mb-2">No products found</h3>
                <p className="text-gray-400 text-center mb-4">Try adjusting your filters or search criteria</p>
                <button 
                  className="px-4 py-2 bg-cyan-400 text-gray-900 font-medium rounded-md"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div 
                className={`grid grid-cols-1 ${displayMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : ''} gap-6`}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {currentProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    variants={fadeInUp}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2">
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </button>
                  
                  {[...Array(totalPages).keys()].map((number) => (
                    <button 
                      key={number + 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-sm ${
                        currentPage === number + 1 
                          ? 'bg-cyan-400 text-gray-900 font-medium' 
                          : 'border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300'
                      }`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                  
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
