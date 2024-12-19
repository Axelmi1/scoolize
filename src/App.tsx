import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { PreparerPage } from './pages/PreparerPage'; // Espace Établissement
import { PredirePage } from './pages/PredirePage';   // Espace Étudiant
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { AdminDashboard } from './pages/AdminDashboard'; // Tableau de bord Établissement
import { LoginPage } from './pages/LoginPage';
import { Home } from 'lucide-react';

export default function App() {
  // Aucune condition d'accès ici, toutes les pages sont accessibles librement.
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/preparer" element={<PreparerPage />} />
            <Route path="/predire" element={<PredirePage />} />
            <Route path="/apply/:formationId" element={<ApplicationPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
