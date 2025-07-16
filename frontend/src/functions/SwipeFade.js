import { motion } from "framer-motion";

const SwipeFade = ({
  children,
  swipeDirection = null,
  key,
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      key={key} // triggers animation on page change
      initial={{ x: swipeDirection === "left" ? 300 : -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: swipeDirection === "left" ? -300 : 300, opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeFade;
