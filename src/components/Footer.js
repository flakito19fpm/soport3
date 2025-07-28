import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      className="bg-stone-800 text-stone-400 p-6 text-center mt-12 shadow-inner"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
    >
      <div className="container mx-auto">
        <p className="flex items-center justify-center gap-2">
          Hecho con <Heart className="w-4 h-4 text-red-500" /> por tu IA favorita (y más sarcástica).
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Todos los derechos reservados. O no, ¿a quién le importa?
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;