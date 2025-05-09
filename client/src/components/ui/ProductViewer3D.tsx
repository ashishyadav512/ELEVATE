import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ProductViewer3DProps {
  images: string[];
}

const ProductViewer3D = ({ images }: ProductViewer3DProps) => {
  // Prevent errors when images array is empty
  if (!images.length) {
    return (
      <div className="relative h-96 md:h-[500px] mb-4 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-gray-400">No product images available</p>
      </div>
    );
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const rotationRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      startXRef.current = e.clientX;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (startXRef.current === null) return;
      
      const deltaX = e.clientX - startXRef.current;
      const newRotation = rotationRef.current + deltaX * 0.5;
      setRotation(newRotation);
      
      // Change image based on rotation
      const imageIndex = Math.abs(Math.floor(newRotation / 90) % images.length);
      setCurrentIndex(imageIndex);
    };

    const handleMouseUp = () => {
      rotationRef.current = rotation;
      startXRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startXRef.current === null) return;
      
      const deltaX = e.touches[0].clientX - startXRef.current;
      const newRotation = rotationRef.current + deltaX * 0.5;
      setRotation(newRotation);
      
      // Change image based on rotation
      const imageIndex = Math.abs(Math.floor(newRotation / 90) % images.length);
      setCurrentIndex(imageIndex);
    };

    const handleTouchEnd = () => {
      rotationRef.current = rotation;
      startXRef.current = null;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('mousedown', handleMouseDown);
      viewer.addEventListener('touchstart', handleTouchStart);

      return () => {
        viewer.removeEventListener('mousedown', handleMouseDown);
        viewer.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [images, rotation]);

  const rotateLeft = () => {
    const newRotation = rotation - 90;
    setRotation(newRotation);
    rotationRef.current = newRotation;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const rotateRight = () => {
    const newRotation = rotation + 90;
    setRotation(newRotation);
    rotationRef.current = newRotation;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] mb-4 bg-gray-800 rounded-lg overflow-hidden perspective">
      <motion.div 
        ref={viewerRef}
        className="absolute inset-0 transform-style-3d cursor-grab"
        style={{ transform: `rotateY(${rotation}deg)` }}
        animate={{ rotateY: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Product view ${currentIndex + 1}`} 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      <div className="absolute bottom-3 right-3 flex space-x-2">
        <motion.button 
          className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-100 hover:text-cyan-400"
          onClick={rotateLeft}
          whileTap={{ scale: 0.9 }}
          aria-label="Rotate left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </motion.button>
        <motion.button 
          className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-100 hover:text-cyan-400"
          onClick={rotateRight}
          whileTap={{ scale: 0.9 }}
          aria-label="Rotate right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default ProductViewer3D;
