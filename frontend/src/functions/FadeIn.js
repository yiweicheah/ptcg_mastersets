import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0, duration = 0.5, yOffset = 20 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
