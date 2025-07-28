import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './pages/WelcomePage';
import ReportForm from './pages/ReportForm';
import TechnicianDashboard from './pages/TechnicianDashboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-stone-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/reportar" element={<ReportForm />} />
            <Route path="/tecnicos" element={<TechnicianDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;