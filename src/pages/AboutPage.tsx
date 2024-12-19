import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BookOpen, Heart, Lightbulb } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          À propos de <span className="text-blue-600">Parcoursup</span>
        </h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
          Parcoursup est le fruit d’une vision : rendre l’accès à l’enseignement supérieur plus juste, plus transparent, et plus simple.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-12 mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
          hidden: { opacity: 0 },
        }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-10"
          variants={{ visible: { opacity: 1, x:0 }, hidden: { opacity:0, x:-50 }}}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Offrir à chaque étudiant un véritable tremplin vers sa réussite. Parcoursup a été conçu pour donner accès à l’information, éclaircir les processus, et garantir une égalité de traitement.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-10"
          variants={{ visible: { opacity: 1, x:0 }, hidden: { opacity:0, x:50 }}}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Approche</h2>
          <p className="text-gray-700 leading-relaxed">
            Transparence, collaboration avec les établissements, et innovation technologique. Nous travaillons main dans la main avec les universités, écoles, et instituts pour simplifier le parcours de chaque candidat.
          </p>
        </motion.div>
      </motion.div>

      <div className="mb-20">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          transition={{ duration:1 }}
        >
          Nos Valeurs
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-12">
          <ValueCard icon={Heart} title="Équité" color="text-red-500">
            Chaque étudiant bénéficie des mêmes informations et des mêmes opportunités, sans barrières.
          </ValueCard>
          <ValueCard icon={Globe} title="Innovation" color="text-green-500">
            Nous adaptons sans cesse notre plateforme, intégrant IA, recommandations personnalisées, et outils modernes.
          </ValueCard>
          <ValueCard icon={BookOpen} title="Clarté" color="text-blue-500">
            Des informations précises, faciles à comprendre, pour orienter les choix en toute confiance.
          </ValueCard>
          <ValueCard icon={Lightbulb} title="Accompagnement" color="text-yellow-500">
            Un soutien de bout en bout : du premier clic sur la plateforme jusqu’à l’inscription définitive.
          </ValueCard>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, color, children }) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness:300 }}
    >
      <Icon className={`h-16 w-16 ${color} mx-auto mb-6`} />
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700">{children}</p>
    </motion.div>
  );
}
