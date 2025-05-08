import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Category } from '@shared/schema';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div 
      className="overflow-hidden rounded-lg relative group h-96"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
        <Link href={`/shop?category=${category.slug}`} className="text-neon-cyan inline-flex items-center group-hover:underline">
          Explore 
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
