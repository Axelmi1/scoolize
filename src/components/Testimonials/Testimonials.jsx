// src/components/testimonials/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Emma Dubois',
      quote: 'Grâce à cette plateforme inspirée de Parcoursup, j’ai trouvé la formation idéale pour réaliser mon rêve professionnel.',
      image: '/images/user1.jpg',
    },
    {
      name: 'Lucas Martin',
      quote: 'Une interface d’État moderne, simple et claire, qui m\'a aidé à y voir plus clair dans mon orientation.',
      image: '/images/user2.jpg',
    },
    {
      name: 'Sophie Bernard',
      quote: 'Le soutien personnalisé et la transparence m\'ont vraiment aidée à faire le bon choix pour mon avenir.',
      image: '/images/user3.jpg',
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Ce que disent nos utilisateurs
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
