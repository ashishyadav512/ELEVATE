import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from '@shared/schema';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: number[];
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  onCategoryChange: (categoryId: number) => void;
  onPriceChange: (range: [number, number]) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterSidebar = ({
  categories,
  selectedCategories,
  priceRange,
  selectedColors,
  selectedSizes,
  onCategoryChange,
  onPriceChange,
  onColorChange,
  onSizeChange,
  onApplyFilters,
  onResetFilters,
}: FilterSidebarProps) => {
  const [priceValue, setPriceValue] = useState(priceRange[1]);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceValue(value);
    onPriceChange([priceRange[0], value]);
  };

  const colors = [
    { name: 'white', value: '#FFFFFF' },
    { name: 'black', value: '#000000' },
    { name: 'red', value: '#DC2626' },
    { name: 'blue', value: '#2563EB' },
    { name: 'green', value: '#16A34A' },
    { name: 'yellow', value: '#F59E0B' },
    { name: 'purple', value: '#7C3AED' },
    { name: 'pink', value: '#DB2777' },
  ];

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

  return (
    <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6">
      <div className="mb-8">
        <h3 className="font-semibold mb-4 uppercase">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox mr-3 text-cyan-400 border-gray-600 rounded focus:ring-cyan-400"
                checked={selectedCategories.includes(category.id)}
                onChange={() => onCategoryChange(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-semibold mb-4 uppercase">Price Range</h3>
        <input
          type="range"
          min={50}
          max={450}
          value={priceValue}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-300">
          <span>${50}</span>
          <span className="text-cyan-400 font-medium">${priceValue}</span>
          <span>${450}</span>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-semibold mb-4 uppercase">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <motion.button
              key={color.name}
              className={`w-8 h-8 rounded-full`}
              style={{ 
                backgroundColor: color.value,
                borderWidth: '2px',
                borderColor: selectedColors.includes(color.name) ? '#22d3ee' : '#374151',
                boxShadow: selectedColors.includes(color.name) ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none'
              }}
              onClick={() => onColorChange(color.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Filter by ${color.name} color`}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-semibold mb-4 uppercase">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              className={`py-2 border ${
                selectedSizes.includes(size)
                  ? 'border-cyan-400 text-cyan-400 bg-gray-900'
                  : 'border-gray-700 text-gray-300'
              } rounded hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300`}
              onClick={() => onSizeChange(size)}
              whileTap={{ scale: 0.95 }}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <motion.button
          className="w-full py-3 bg-cyan-400 text-gray-900 font-bold uppercase rounded-sm"
          onClick={onApplyFilters}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Apply Filters
        </motion.button>
        <motion.button
          className="w-full py-3 text-gray-300 font-medium mt-2 hover:text-cyan-400 transition-colors"
          onClick={onResetFilters}
        >
          Reset Filters
        </motion.button>
      </div>
    </div>
  );
};

export default FilterSidebar;
