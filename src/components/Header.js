import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header
      className="bg-stone-800 text-stone-100 p-6 shadow-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <Coffee className="w-8 h-8 text-amber-400" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reporte de Fallas
          </h1>
        </Link>
        <nav>
          <Link
            to="/tecnicos"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-700 hover:bg-stone-600 transition-colors duration-300 text-lg font-medium shadow-md"
          >
            <Wrench className="w-5 h-5" />
            Acceso Técnicos
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;