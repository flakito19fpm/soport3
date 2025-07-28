import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, XCircle, Clock, Coffee, User, Tag, FileText, Lock, CalendarDays, MessageSquare, Phone, Search, BarChart2, ListTodo, CheckSquare, Hourglass, Users } from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TechnicianDashboard = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const CORRECT_PASSWORD = 'coffe1976+';

  // Lista de técnicos de ejemplo (en un sistema real, esto vendría de una base de datos)
  const technicians = [
    { id: 'jonathan', name: 'Jonathan Quintal Valencia' },
    { id: 'carlos', name: 'Carlos Hernandez Valencia' },
  ];

  useEffect(() => {
    if (loggedIn) {
      const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
        const fetchedReports = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(fetchedReports);
      }, (error) => {
        console.error("Error al obtener los reportes: ", error);
        alert("Error al cargar los reportes. Por favor, recarga la página.");
      });

      return () => unsubscribe();
    }
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert('Contraseña incorrecta. ¿Seguro que eres un técnico y no un espía del té?');
      setPassword('');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const reportRef = doc(db, 'reports', id);
    try {
      await updateDoc(reportRef, { status: newStatus });
    } catch (e) {
      console.error("Error al actualizar el estado: ", e);
      alert("Error al actualizar el estado del reporte.");
    }
  };

  const handleObservationChange = async (id, value) => {
    const reportRef = doc(db, 'reports', id);
    try {
      await updateDoc(reportRef, { observations: value });
    } catch (e) {
      console.error("Error al actualizar las observaciones: ", e);
      alert("Error al actualizar las observaciones.");
    }
  };

  const handleRepairDateChange = async (id, value) => {
    const reportRef = doc(db, 'reports', id);
    try {
      await updateDoc(reportRef, { repairDate: value });
    } catch (e) {
      console.error("Error al actualizar la fecha de reparación: ", e);
      alert("Error al actualizar la fecha de reparación.");
    }
  };

  const handleTechnicianAssignment = async (id, technicianId) => {
    const reportRef = doc(db, 'reports', id);
    try {
      await updateDoc(reportRef, { assignedTechnician: technicianId });
    } catch (e) {
      console.error("Error al asignar técnico: ", e);
      alert("Error al asignar el técnico.");
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = searchTerm === '' ||
      report.cafeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.equipmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.assignedTechnician && technicians.find(t => t.id === report.assignedTechnician)?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'in-progress':
        return <Wrench className="w-4 h-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  // Métricas para el dashboard
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const inProgressReports = reports.filter(r => r.status === 'in-progress').length;
  const completedReports = reports.filter(r => r.status === 'completed').length;

  if (!loggedIn) {
    return (
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto my-20 border border-stone-200 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <Lock className="w-20 h-20 text-stone-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-stone-800 mb-6">Acceso Restringido</h2>
        <p className="text-stone-700 mb-6">
          Por favor, introduce la contraseña de técnico para acceder al panel.
          ¡No intentes adivinarla, no eres tan listo!
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña de técnico"
            className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg bg-stone-50"
            required
          />
          <motion.button
            type="submit"
            className="w-full bg-stone-700 text-white px-6 py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-stone-600 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wrench className="w-5 h-5" />
            Acceder
          </motion.button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-extrabold text-stone-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-stone-700 to-amber-800">
        Panel de Técnicos
      </h2>

      {/* Dashboard Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-stone-500 font-medium">Total Reportes</p>
            <h3 className="text-4xl font-bold text-stone-800">{totalReports}</h3>
          </div>
          <ListTodo className="w-12 h-12 text-stone-400" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-stone-500 font-medium">Pendientes</p>
            <h3 className="text-4xl font-bold text-yellow-600">{pendingReports}</h3>
          </div>
          <Hourglass className="w-12 h-12 text-yellow-400" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-stone-500 font-medium">En Progreso</p>
            <h3 className="text-4xl font-bold text-orange-600">{inProgressReports}</h3>
          </div>
          <Wrench className="w-12 h-12 text-orange-400" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-stone-500 font-medium">Completados</p>
            <h3 className="text-4xl font-bold text-emerald-600">{completedReports}</h3>
          </div>
          <CheckSquare className="w-12 h-12 text-emerald-400" />
        </div>
      </motion.div>

      {/* Barra de búsqueda */}
      <motion.div
        className="relative mb-8 max-w-xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Buscar reportes por nombre, equipo, descripción o técnico..."
          className="w-full px-5 py-3 pl-12 border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg shadow-sm bg-stone-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-6 h-6" />
      </motion.div>

      <div className="flex justify-center mb-8 space-x-4">
        <motion.button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            filter === 'all' ? 'bg-stone-700 text-white shadow-md' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Todos
        </motion.button>
        <motion.button
          onClick={() => setFilter('pending')}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            filter === 'pending' ? 'bg-yellow-600 text-white shadow-md' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pendientes
        </motion.button>
        <motion.button
          onClick={() => setFilter('in-progress')}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            filter === 'in-progress' ? 'bg-orange-600 text-white shadow-md' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          En Progreso
        </motion.button>
        <motion.button
          onClick={() => setFilter('completed')}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            filter === 'completed' ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Completados
        </motion.button>
      </div>

      {filteredReports.length === 0 ? (
        <motion.div
          className="bg-white p-8 rounded-3xl shadow-xl text-center border border-stone-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl text-stone-700 font-medium">
            No hay reportes para mostrar en esta categoría. ¡Parece que todo funciona!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * reports.indexOf(report) }}
              whileHover={{ translateY: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-stone-800">
                    <Coffee className="inline-block w-6 h-6 mr-2 text-stone-700" />
                    {report.cafeName}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {report.status === 'pending' && 'Pendiente'}
                    {report.status === 'in-progress' && 'En Progreso'}
                    {report.status === 'completed' && 'Completado'}
                  </span>
                </div>
                <p className="text-stone-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-stone-600" />
                  <span className="font-medium">{report.reporterName}</span>
                </p>
                <p className="text-stone-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-stone-600" />
                  <span className="font-medium">{report.contactNumber}</span>
                </p>
                <p className="text-stone-700 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-stone-600" />
                  <span className="font-medium">{report.equipmentType}</span>
                </p>
                <p className="text-stone-800 text-base mb-4 flex items-start">
                  <FileText className="w-4 h-4 mr-2 mt-1 text-stone-600 flex-shrink-0" />
                  <span className="flex-grow">{report.description}</span>
                </p>
                <p className="text-stone-600 text-sm mb-4">
                  Reportado: {report.reportedAt ? new Date(report.reportedAt).toLocaleString() : 'N/A'}
                </p>

                {/* Asignación de Técnico */}
                <div className="mt-4">
                  <label htmlFor={`technician-${report.id}`} className="block text-stone-700 text-sm font-medium mb-1 flex items-center">
                    <Users className="w-4 h-4 mr-1 text-stone-600" />
                    Asignar Técnico:
                  </label>
                  <select
                    id={`technician-${report.id}`}
                    value={report.assignedTechnician || ''}
                    onChange={(e) => handleTechnicianAssignment(report.id, e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm bg-stone-50"
                  >
                    <option value="">Sin asignar</option>
                    {technicians.map(tech => (
                      <option key={tech.id} value={tech.id}>{tech.name}</option>
                    ))}
                  </select>
                  {report.assignedTechnician && (
                    <p className="text-stone-500 text-xs mt-1">
                      Asignado a: {technicians.find(t => t.id === report.assignedTechnician)?.name}
                    </p>
                  )}
                </div>

                {/* Campo de Observaciones */}
                <div className="mt-4">
                  <label htmlFor={`observations-${report.id}`} className="block text-stone-700 text-sm font-medium mb-1 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1 text-stone-600" />
                    Observaciones:
                  </label>
                  <textarea
                    id={`observations-${report.id}`}
                    value={report.observations}
                    onChange={(e) => handleObservationChange(report.id, e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm bg-stone-50"
                    placeholder="Añadir observaciones del técnico..."
                  ></textarea>
                </div>

                {/* Campo de Fecha de Revisión/Reparación */}
                <div className="mt-3">
                  <label htmlFor={`repairDate-${report.id}`} className="block text-stone-700 text-sm font-medium mb-1 flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1 text-stone-600" />
                    Fecha de Revisión/Reparación:
                  </label>
                  <input
                    type="date"
                    id={`repairDate-${report.id}`}
                    value={report.repairDate}
                    onChange={(e) => handleRepairDateChange(report.id, e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm bg-stone-50"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-stone-100">
                {report.status !== 'in-progress' && (
                  <motion.button
                    onClick={() => handleStatusChange(report.id, 'in-progress')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Marcar En Progreso
                  </motion.button>
                )}
                {report.status !== 'completed' && (
                  <motion.button
                    onClick={() => handleStatusChange(report.id, 'completed')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Marcar Completado
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TechnicianDashboard;