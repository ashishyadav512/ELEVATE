// import { motion } from 'framer-motion';
// import { Link } from 'wouter';
// import { Product } from '@shared/schema';
// import { useState } from 'react';
// import { useToast } from '@/hooks/use-toast';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const { toast } = useToast();

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     toast({
//       title: "Added to cart",
//       description: `${product.name} has been added to your cart.`,
//       duration: 3000,
//     });
//   };

//   const toggleLike = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);
//   };

//   return (
//     <motion.div 
//       className="product-card bg-dark-700 rounded-lg overflow-hidden"
//       whileHover={{ y: -10, scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Link href={`/product/${product.slug}`}>
//         <div className="relative h-64 overflow-hidden">
//           <img 
//             src={product.imageUrls[0]} 
//             alt={product.name} 
//             className="w-full h-full object-cover transform transition-all duration-500 hover:scale-105"
//           />
//           {product.isNew && (
//             <div className="absolute top-3 right-3 bg-neon-pink px-2 py-1 text-xs uppercase font-semibold rounded">
//               New
//             </div>
//           )}
//           {product.salePrice && (
//             <div className="absolute top-3 right-3 bg-neon-green px-2 py-1 text-xs uppercase font-semibold rounded text-dark-900">
//               Sale
//             </div>
//           )}
//           <button 
//             className="absolute bottom-3 right-3 bg-dark-900/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-light-100 hover:text-neon-cyan transition-colors duration-300"
//             onClick={toggleLike}
//             aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
//           >
//             {isLiked ? (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
//               </svg>
//             )}
//           </button>
//         </div>
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="font-semibold">{product.name}</h3>
//             {product.salePrice ? (
//               <div className="flex flex-col items-end">
//                 <span className="text-light-300 text-sm line-through">${product.price}</span>
//                 <span className="text-neon-green font-bebas text-xl">${product.salePrice}</span>
//               </div>
//             ) : (
//               <span className="text-neon-cyan font-bebas text-xl">${product.price}</span>
//             )}
//           </div>
//           <p className="text-light-300 text-sm mb-4">{product.shortDescription}</p>
//           <button 
//             className="w-full py-2 bg-dark-600 hover:bg-neon-cyan hover:text-dark-900 transition-all duration-300 rounded-sm font-medium uppercase text-sm tracking-wider"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default ProductCard;


import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div 
      className="product-card bg-dark-700 rounded-lg overflow-hidden" // <- Requires custom color
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-all duration-500 hover:scale-105"
          />
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-pink-500 px-2 py-1 text-xs uppercase font-semibold rounded">
              New
            </div>

          )}
          {product.salePrice && (
          <div className="absolute top-3 right-3 bg-green-500 px-2 py-1 text-xs uppercase font-semibold rounded text-gray-900">
            Sale
          </div>

          )}
          <button 
            className="absolute bottom-3 right-3 bg-gray-800/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-light-100 hover:text-cyan-400 transition-colors duration-300"

            onClick={toggleLike}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            )}
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{product.name}</h3>
            {product.salePrice ? (
              <div className="flex flex-col items-end">
                <span className="text-light-300 text-sm line-through">${product.price}</span>
                <span className="text-green-400 font-bold text-2xl">${product.salePrice}</span>
              </div>
            ) : (
      <span className="text-cyan-400 font-bebas text-xl">${product.price}</span>
            )}
          </div>
          <p className="text-light-300 text-sm mb-4">{product.shortDescription}</p>
          <button 
            className="w-full py-2 bg-dark-600 hover:bg-cyan-400 hover:text-dark-900 transition-all duration-300 rounded-sm font-medium uppercase text-sm tracking-wider"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
