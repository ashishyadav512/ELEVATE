import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatsCounterProps {
  icon: React.ReactNode;
  target: number;
  label: string;
  suffix?: string;
}

const StatsCounter = ({ icon, target, label, suffix = '' }: StatsCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationId: number;
      const duration = 2000; // 2 seconds animation
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * target);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationId = requestAnimationFrame(animateCount);
        }
      };
      
      animationId = requestAnimationFrame(animateCount);
      
      return () => cancelAnimationFrame(animationId);
    }
  }, [isInView, target]);
  
  return (
    <motion.div 
      ref={ref}
      className="bg-dark-700 p-6 rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-neon-cyan mb-2">
        {icon}
      </div>
      <h4 className="text-4xl font-bold font-bebas mb-2">
        {count.toLocaleString()}{suffix}
      </h4>
      <p className="text-light-300">{label}</p>
    </motion.div>
  );
};

export default StatsCounter;
