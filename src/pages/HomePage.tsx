import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Info, BookOpen, Users, Globe, Calendar, Award, HelpCircle, ExternalLink, ChevronRight, CheckCircle, Video, FileText, Download } from 'lucide-react';

// Couleurs, police, etc.
// On suppose que la police Marianne est chargée via un CSS global (font-family: 'Marianne', sans-serif;).
// Couleurs :
// Principale : #6a6af4
// Hover : #9898f8
// Active : #aeaef9

export function HomePage() {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (id) => {
    setFaqOpen(faqOpen === id ? null : id);
  };

  return (
    <div className="font-sans" style={{fontFamily:'Marianne, sans-serif'}}>
      {/* Header Officiel */}
      <header className="w-full fixed top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo officiel */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/fr.png" // Marianne symbol
              alt="République Française"
              className="h-8 w-auto"
            />
            <span className="text-sm text-gray-700 italic whitespace-nowrap">
              Plateforme nationale d’orientation post-bac
            </span>
          </div>
          {/* Nom Parcoursup */}
          <Link to="/" className="flex items-center group">
            <GraduationCap className="h-8 w-8 text-[#6a6af4] group-hover:text-[#9898f8] transition-colors duration-300" />
            <span className="ml-3 text-2xl font-bold text-gray-900 relative">
              Parcoursup
            </span>
          </Link>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          className="relative bg-white pt-20 pb-16 overflow-hidden"
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1 }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Construisez votre avenir avec <span className="text-[#6a6af4]">Parcoursup</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              La plateforme officielle d’accès aux études supérieures en France. Découvrez des milliers de formations, recevez des conseils personnalisés, et préparez votre parcours post-bac en toute confiance.
            </p>
            <Link
              to="/predire"
              className="inline-flex items-center px-8 py-4 text-white rounded-full font-semibold shadow-md"
              style={{backgroundColor: '#6a6af4'}}
            >
              Commencer Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        </motion.section>

        {/* Section Présentation */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Pourquoi Parcoursup ?</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Parcoursup est conçu pour garantir l’accès équitable, la transparence et l’accompagnement des étudiants dans leur choix d’orientation. Inspiré par l’exigence et le service public, il simplifie et centralise les démarches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Info className="h-12 w-12 text-[#6a6af4] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparence</h3>
              <p className="text-gray-700 leading-relaxed">
                Des critères d’admission clairs, un accès égal aux informations, et une communication constante avec les établissements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <BookOpen className="h-12 w-12 text-[#6a6af4] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accompagnement</h3>
              <p className="text-gray-700 leading-relaxed">
                Des outils, des guides, un calendrier officiel, et des ressources d’orientation vous soutiennent à chaque étape.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Users className="h-12 w-12 text-[#6a6af4] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Équité</h3>
              <p className="text-gray-700 leading-relaxed">
                Garantir à tous les étudiants, quels que soient leur origine, leur lycée ou leur parcours, la possibilité de candidater aux formations de leur choix.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline des étapes Parcoursup */}
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Le Parcours Parcoursup</h2>
          <div className="relative border-l-4 border-[#6a6af4] pl-8 space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Janvier</h3>
              <p className="text-gray-700 mt-2">
                Ouverture de la plateforme, découverte des formations, et élaboration de la liste de vœux.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Mars</h3>
              <p className="text-gray-700 mt-2">
                Date limite pour formuler ses vœux, commencer à constituer son dossier, remplir les informations demandées par les établissements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Avril</h3>
              <p className="text-gray-700 mt-2">
                Confirmation des vœux, finalisation du dossier. Les établissements examinent les candidatures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Mai - Juin</h3>
              <p className="text-gray-700 mt-2">
                Réception des réponses des établissements, phase complémentaire pour trouver des places vacantes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Juillet</h3>
              <p className="text-gray-700 mt-2">
                Inscriptions administratives dans la formation choisie, préparation de la rentrée.
              </p>
            </div>
          </div>
        </section>

        {/* Statistiques Clés */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Chiffres Clés</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-gray-900 mb-3">1M+</h3>
              <p className="text-lg text-gray-700">Candidatures traitées chaque année</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-gray-900 mb-3">17K+</h3>
              <p className="text-lg text-gray-700">Formations disponibles</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-gray-900 mb-3">98%</h3>
              <p className="text-lg text-gray-700">Taux de satisfaction des utilisateurs</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-gray-900 mb-3">50+</h3>
              <p className="text-lg text-gray-700">Partenariats institutionnels</p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ils nous ont fait confiance</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "Grâce à Parcoursup, j’ai pu accéder à une formation que je n’aurais jamais envisagée auparavant. Leurs informations claires m’ont vraiment aidé."
              </p>
              <h3 className="text-xl font-semibold text-gray-900">- Julie, Étudiante</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "Comme parent, j’ai vu mon fils gagner en autonomie et en clarté dans son choix d’études. Parcoursup a rendu ce parcours bien plus lisible."
              </p>
              <h3 className="text-xl font-semibold text-gray-900">- Christophe, Parent</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "En tant qu’enseignante, je recommande Parcoursup à mes élèves. Ils y trouvent des informations fiables et un accompagnement complet."
              </p>
              <h3 className="text-xl font-semibold text-gray-900">- Mme Dupuis, Professeure</h3>
            </div>
          </div>
        </section>

        {/* Ressources Officielles */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ressources Officielles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Guides et Brochures</h3>
              <p className="text-gray-700 flex-1">
                Téléchargez nos guides officiels, brochures des établissements, et infographies. Mettez toutes les chances de votre côté.
              </p>
              <div className="mt-4">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white"
                  style={{backgroundColor:'#6a6af4'}}
                >
                  <Download className="h-5 w-5 mr-2"/>
                  Télécharger
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vidéos et Webinaires</h3>
              <p className="text-gray-700 flex-1">
                Regardez des vidéos explicatives, participez à des webinaires en direct, et posez vos questions à des experts.
              </p>
              <div className="mt-4">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  <Video className="h-5 w-5 mr-2"/>
                  Visionner
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Liens Utiles</h3>
              <p className="text-gray-700 flex-1">
                Accédez à des sites institutionnels, des annuaires, et des ressources en ligne pour approfondir vos recherches.
              </p>
              <div className="mt-4">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white"
                  style={{backgroundColor:'#6a6af4'}}
                >
                  <ExternalLink className="h-5 w-5 mr-2"/>
                  Parcourir
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Foire Aux Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <button 
                onClick={()=>toggleFaq(1)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-900">Comment créer mon dossier Parcoursup ?</span>
                <ChevronRight className={`h-5 w-5 transform transition-transform ${faqOpen === 1 ? 'rotate-90' : ''}`} />
              </button>
              <div className={`mt-2 text-gray-700 leading-relaxed ${faqOpen === 1 ? 'block' : 'hidden'}`}>
                Il vous suffit de cliquer sur "Commencer Maintenant", de renseigner vos informations personnelles, et de créer votre dossier. Vous pourrez ensuite ajouter vos vœux, importer vos relevés, et suivre les réponses.
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <button 
                onClick={()=>toggleFaq(2)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-900">Puis-je modifier mes vœux après les avoir soumis ?</span>
                <ChevronRight className={`h-5 w-5 transform transition-transform ${faqOpen === 2 ? 'rotate-90' : ''}`} />
              </button>
              <div className={`mt-2 text-gray-700 leading-relaxed ${faqOpen === 2 ? 'block' : 'hidden'}`}>
                Jusqu’à la date limite de confirmation, vous pouvez modifier, supprimer, ou réordonner vos vœux. Après cette date, seules certaines actions spécifiques resteront possibles.
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <button 
                onClick={()=>toggleFaq(3)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-900">Comment obtenir de l’aide si je suis perdu ?</span>
                <ChevronRight className={`h-5 w-5 transform transition-transform ${faqOpen === 3 ? 'rotate-90' : ''}`} />
              </button>
              <div className={`mt-2 text-gray-700 leading-relaxed ${faqOpen === 3 ? 'block' : 'hidden'}`}>
                Vous pouvez consulter nos guides, participer à des webinaires, contacter le support Parcoursup, ou solliciter votre conseiller d’orientation au lycée.
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Prêt à commencer ?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Créez votre dossier, explorez les formations, et lancez-vous dans l’aventure de l’enseignement supérieur avec Parcoursup.
          </p>
          <Link
            to="/predire"
            className="inline-flex items-center px-8 py-4 font-semibold rounded-full text-white shadow-md"
            style={{backgroundColor: '#6a6af4'}}
          >
            Créer mon dossier
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>

      {/* Footer sobre et institutionnel */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-gray-600 text-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img
                src="/images/fr.png"
                alt="République Française"
                className="h-6 w-auto"
              />
              <span>
                © {new Date().getFullYear()} Parcoursup - Ministère de l’Enseignement supérieur et de la Recherche
              </span>
            </div>
            <div className="space-x-4">
              <Link to="/about" className="hover:underline">À propos</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
              <a href="#" onClick={(e)=>e.preventDefault()} className="hover:underline">Mentions légales</a>
              <a href="#" onClick={(e)=>e.preventDefault()} className="hover:underline">Accessibilité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
