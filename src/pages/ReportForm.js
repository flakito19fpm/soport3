import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, User, Tag, FileText, Send, CheckCircle, Phone } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta

const ReportForm = () => {
  const [formData, setFormData] = useState({
    cafeName: '',
    reporterName: '',
    contactNumber: '',
    equipmentType: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Añadir un nuevo documento a la colección 'reports' en Firestore
      await addDoc(collection(db, 'reports'), {
        ...formData,
        status: 'pending', // Estado inicial del reporte
        reportedAt: new Date().toISOString(),
        observations: '',
        repairDate: '',
        assignedTechnician: '', // Campo para el técnico asignado
      });
      setSubmitted(true);
      setFormData({ // Limpiar el formulario
        cafeName: '',
        reporterName: '',
        contactNumber: '',
        equipmentType: '',
        description: '',
      });
    } catch (e) {
      console.error("Error al añadir el documento: ", e);
      setError("Error al enviar el reporte. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-2xl mx-auto my-12 border border-emerald-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <CheckCircle className="w-24 h-24 text-emerald-600 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-stone-800 mb-4">¡Reporte Enviado con Éxito!</h2>
        <p className="text-xl text-stone-700 mb-6">
          Tu reporte ha sido recibido. Uno de nuestros técnicos te contactará en un lapso no mayor a 24 horas.
          ¡Ahora puedes relajarte y esperar que la magia suceda!
        </p>
        <motion.button
          onClick={() => setSubmitted(false)}
          className="bg-stone-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-600 transition-colors duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reportar otra falla
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto my-12 border border-stone-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold text-stone-800 mb-8 text-center">
        Reportar una Falla
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cafeName" className="block text-stone-700 text-lg font-medium mb-2">
            <Coffee className="inline-block w-5 h-5 mr-2 text-stone-600" />
            Nombre de Cafetería o Restaurante:
          </label>
          <input
            type="text"
            id="cafeName"
            name="cafeName"
            value={formData.cafeName}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg bg-stone-50"
            placeholder="Ej: Café del Sol"
          />
        </div>

        <div>
          <label htmlFor="reporterName" className="block text-stone-700 text-lg font-medium mb-2">
            <User className="inline-block w-5 h-5 mr-2 text-stone-600" />
            Nombre de quien reporta:
          </label>
          <input
            type="text"
            id="reporterName"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg bg-stone-50"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-stone-700 text-lg font-medium mb-2">
            <Phone className="inline-block w-5 h-5 mr-2 text-stone-600" />
            Número de Teléfono de Contacto:
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg bg-stone-50"
            placeholder="Ej: +52 55 1234 5678"
          />
        </div>

        <div>
          <label htmlFor="equipmentType" className="block text-stone-700 text-lg font-medium mb-2">
            <Tag className="inline-block w-5 h-5 mr-2 text-stone-600" />
            Tipo de equipo:
          </label>
          <select
            id="equipmentType"
            name="equipmentType"
            value={formData.equipmentType}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg bg-stone-50"
          >
            <option value="">Selecciona un tipo de equipo</option>
            <option value="cafetera">Cafetera</option>
            <option value="molino">Molino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-stone-700 text-lg font-medium mb-2">
            <FileText className="inline-block w-5 h-5 mr-2 text-stone-600" />
            Descripción o detalles de la falla:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg resize-y bg-stone-50"
            placeholder="Describe el problema con el equipo..."
          ></textarea>
        </div>

        {error && (
          <motion.p
            className="text-red-600 text-center font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-4 rounded-xl text-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Send className="w-6 h-6" />
          )}
          {loading ? 'Enviando...' : 'Enviar Reporte'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ReportForm;