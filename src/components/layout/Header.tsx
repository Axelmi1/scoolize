import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import frImage from '../images/fr.jpg';

export function Header() {
  return (
    <header className="w-full fixed top-0 z-50 font-sans text-gray-900 select-none">
      <div className="relative bg-gradient-to-r from-white via-gray-50 to-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.img
              src={frImage}
              alt="République Française"
              className="h-8 w-auto cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="text-sm text-gray-700 italic whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Plateforme nationale d’orientation post-bac
            </motion.span>
          </div>
          <Link 
            to="/"
            className="flex items-center group"
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: -5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <GraduationCap className="h-8 w-8 text-blue-700 group-hover:text-blue-800 transition-colors duration-300" />
            </motion.div>
            <motion.span
              className="ml-3 text-2xl font-bold text-gray-900 relative"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.3 }}
            >
              Parcoursup
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-700"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </Link>
        </div>
      </div>
    </header>
  );
}
