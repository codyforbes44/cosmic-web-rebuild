
import { motion } from 'framer-motion';

const BackgroundStars = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="star"
          initial={{ opacity: Math.random() * 0.7 + 0.3 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: "white",
            borderRadius: "50%",
            position: "absolute"
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
