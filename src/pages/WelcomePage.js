import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4 py-12 bg-white rounded-3xl shadow-2xl border border-stone-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
      >
        <Coffee className="w-32 h-32 text-amber-700 mx-auto mb-6" />
      </motion.div>
      <motion.h1
        className="text-6xl font-extrabold text-stone-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-stone-800 to-amber-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Bienvenido al Sistema de Reporte de Fallas
      </motion.h1>
      <motion.p
        className="text-xl text-stone-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Aquí podrás reportar cualquier inconveniente con tus cafeteras y molinos,
        o si eres técnico, gestionar los servicios pendientes.
        ¡Porque el café no espera!
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/reportar">
          <motion.button
            className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-8 py-4 rounded-full text-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Coffee className="w-6 h-6" />
            Reportar una Falla
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
        <Link to="/tecnicos">
          <motion.button
            className="bg-stone-700 text-white px-8 py-4 rounded-full text-xl font-semibold flex items-center gap-3 shadow-lg hover:bg-stone-600 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Wrench className="w-6 h-6" />
            Acceso Técnicos
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default WelcomePage;