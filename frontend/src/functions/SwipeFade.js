import { motion } from "framer-motion";

const SwipeFade = ({
  children,
  swipeDirection = null,
  key = null,
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      key={key} // triggers animation on page change
      initial={{ x: swipeDirection === "left" ? 300 : -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: swipeDirection === "left" ? -300 : 300, opacity: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeFade;
