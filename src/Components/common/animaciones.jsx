import React from 'react';
import { motion } from 'framer-motion';

const Animaciones = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      {children}
    </motion.div>
  );
};

export default Animaciones;
