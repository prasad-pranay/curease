
import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) => {
  const reduceMotion = useReducedMotion();

  const offsets = {
    up: { x: 0, y: 24 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, ...offsets[direction] }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
