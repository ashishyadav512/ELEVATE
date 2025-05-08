import { useState } from 'react';
import { motion } from 'framer-motion';

interface SizeSelectorProps {
  sizes: string[];
  onChange: (size: string) => void;
}

const SizeSelector = ({ sizes, onChange }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onChange(size);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">SELECT SIZE</h3>
        <button className="text-cyan-400 text-sm">Size Guide</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size}
            className={`py-2 border ${
              selectedSize === size
                ? 'border-neon-cyan text-cyan-400'
                : 'border-dark-600 text-light-300'
            } rounded hover:border-neon-cyan hover:text-cyan-400`}
            onClick={() => handleSizeSelect(size)}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {size}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
