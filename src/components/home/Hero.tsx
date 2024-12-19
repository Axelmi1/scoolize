// src/components/hero/Hero.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function Hero() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleGetStarted = () => {
    if (user?.role === 'student') {
      navigate('/predire');
    } else if (user?.role === 'admin') {
      navigate('/preparer');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transformez votre avenir</span>
                <span className="block text-blue-600">avec Parcoursup</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                La nouvelle génération d'orientation scolaire en France. Simple, transparente, et personnalisée, grâce à un design inspiré des portails de l’État.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Commencer Maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-blue-400 to-blue-600">
          <div className="w-full h-full bg-opacity-50 bg-black flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
              alt="Étudiants travaillant ensemble"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
