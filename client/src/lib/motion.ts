import { useEffect } from 'react';
import { useAnimation, Variant, Target, VariantLabels } from 'framer-motion';
import { useInView } from 'framer-motion';

// Custom hook for triggering animations when elements are in view
export const useAnimateOnScroll = (ref: React.RefObject<HTMLElement>, animationVariants: {
  visible: Variant;
  hidden: Variant;
}, threshold: number = 0.1) => {
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return controls;
};

// Animation variants for common animations
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const productCardHoverVariants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -10, 
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.98 }
};

export const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const rotateOnViewVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

export const floatVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -20, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

export const glowVariants = {
  initial: { boxShadow: '0 0 0 rgba(0, 240, 255, 0)' },
  animate: { 
    boxShadow: ['0 0 10px rgba(0, 240, 255, 0.5)', '0 0 25px rgba(0, 240, 255, 0.8)', '0 0 10px rgba(0, 240, 255, 0.5)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const pageTransitionVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};
