// src/components/features/Features.jsx
import React from 'react';
import { Shield, Lightbulb, Target } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Transparence',
    description: 'Accédez à toutes les informations nécessaires pour faire un choix éclairé. Parcoursup vous permet de voir clairement les attendus, les prérequis, et le nombre de places disponibles.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Lightbulb,
    title: 'Simplicité',
    description: 'Une interface inspirée de l’UX/UI de l’État, offrant une navigation intuitive. Trouvez vos informations, préparez vos vœux et suivez vos candidatures en quelques clics.',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    icon: Target,
    title: 'Personnalisation',
    description: 'Des recommandations adaptées à votre profil, vos résultats, et vos objectifs. Orientez-vous vers les formations qui vous correspondent vraiment grâce à nos outils innovants.',
    color: 'from-purple-400 to-purple-600'
  }
];

export function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-6">
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-lg inline-block`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
