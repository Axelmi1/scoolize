import React, { useState, useEffect, Fragment } from 'react';
import { Search, ChevronRight, BookOpen, Users, Calendar, FileText, Layers, MapPin, Star, Filter, Download, Info, ExternalLink, ArrowDownCircle, ArrowUpCircle, HelpCircle, PlusCircle, ClipboardList, Wand, Coffee, PenTool, Smartphone, Edit3, Share2, MoreHorizontal, Check, X } from 'lucide-react';
import { FileUpload } from '../components/upload/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

// -------------------------------------------------------------------------
// Données mockées pour les formations
// On va ajouter plus de formations pour rendre le tableau plus riche.
// -------------------------------------------------------------------------
const mockFormations = [
  {
    id: 1,
    name: 'Licence Informatique - Université Paris-Saclay',
    match: 95,
    requirements: 'Bac S ou STI2D',
    places: 150,
    description: 'Formation théorique et pratique en informatique, avec stages et projets concrets, une solide base en algorithmique, programmation, systèmes, réseaux et bases de données. Prépare aux masters et au marché du travail du numérique.',
    startDate: 'Septembre 2024',
    duration: '3 ans',
    campus: 'Orsay',
    level: 'Licence (L3)',
    specialties: ['Développement', 'Réseaux', 'Algorithmes']
  },
  {
    id: 2,
    name: 'BUT Informatique - IUT de Villetaneuse',
    match: 88,
    requirements: 'Bac général ou technologique',
    places: 100,
    description: 'Formation professionnalisante en informatique, alternance possible, forte insertion pro. Idéale pour acquérir des compétences techniques et pratiques en programmation, gestion de projets, UX/UI, et bases de données.',
    startDate: 'Septembre 2024',
    duration: '2 ans',
    campus: 'Villetaneuse',
    level: 'BUT (2 ans)',
    specialties: ['Développement Full-Stack', 'Gestion de projets']
  },
  {
    id: 3,
    name: 'Licence de Droit - Université de Nanterre',
    match: 70,
    requirements: 'Bac général, goût pour les matières littéraires',
    places: 300,
    description: 'Approche globale du droit, des institutions, et de la justice, avec conférences et séminaires. Prépare aux concours administratifs, aux écoles d’avocats, et à la recherche en sciences juridiques.',
    startDate: 'Septembre 2024',
    duration: '3 ans',
    campus: 'Nanterre',
    level: 'Licence (L3)',
    specialties: ['Droit public', 'Droit privé', 'Institutions européennes']
  },
  {
    id: 4,
    name: 'BTS Commerce International - Lycée Dupont',
    match: 60,
    requirements: 'Bac général ou STMG',
    places: 60,
    description: 'Formation courte et professionnalisante visant à développer des compétences en commerce international, langues étrangères, négociation, gestion des échanges commerciaux et marketing international.',
    startDate: 'Septembre 2024',
    duration: '2 ans',
    campus: 'Paris',
    level: 'BTS (2 ans)',
    specialties: ['Commerce', 'Langues', 'Marketing']
  },
  {
    id: 5,
    name: 'Master IA et Data Mining - ENS Ulm',
    match: 92,
    requirements: 'Licence Informatique ou Maths + sélection',
    places: 30,
    description: 'Formation d’excellence en intelligence artificielle, apprentissage profond, data mining, offrant un tremplin vers la recherche et des postes à haute responsabilité technique. Collaboration avec des labos de renom.',
    startDate: 'Septembre 2024',
    duration: '2 ans',
    campus: 'Paris',
    level: 'Master (M2)',
    specialties: ['Machine Learning', 'Deep Learning', 'Big Data']
  },
];

// -------------------------------------------------------------------------
// Composants Modals et autres UI avancées
// -------------------------------------------------------------------------
function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
            initial={{ y:50, opacity:0 }}
            animate={{ y:0, opacity:1 }}
            exit={{ y:50, opacity:0 }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormationModal({ isOpen, onClose, formation }) {
  // On affiche des détails supplémentaires sur la formation, comme ses débouchés, liens utiles, etc.
  if(!formation) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Détails - ${formation.name}`}>
      <div className="space-y-4 text-gray-700">
        <p><strong>Niveau :</strong> {formation.level}</p>
        <p><strong>Campus :</strong> {formation.campus}</p>
        <p><strong>Durée :</strong> {formation.duration}</p>
        <p><strong>Spécialités :</strong> {formation.specialties.join(', ')}</p>
        <p className="leading-relaxed whitespace-pre-wrap">{formation.description}</p>
        
        <hr className="my-4"/>

        <h3 className="text-xl font-semibold text-gray-900">Débouchés et Carrière</h3>
        <p>Après cette formation, vous pouvez poursuivre vers un Master, tenter des concours, ou entrer directement sur le marché du travail. Les secteurs sont variés et en forte demande.</p>
        
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Liens Utiles</h3>
        <ul className="list-disc ml-5 text-blue-600 underline">
          <li><a href="#" onClick={(e)=>e.preventDefault()}>Site officiel de l’Université</a></li>
          <li><a href="#" onClick={(e)=>e.preventDefault()}>Brochure PDF</a></li>
          <li><a href="#" onClick={(e)=>e.preventDefault()}>Statistiques d’insertion professionnelle</a></li>
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </Modal>
  );
}

// -------------------------------------------------------------------------
// Composant principal PredirePage
// -------------------------------------------------------------------------
export function PredirePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<number | null>(null);
  const [filteredFormations, setFilteredFormations] = useState(mockFormations);

  // États pour filtres avancés
  const [durationFilter, setDurationFilter] = useState('');
  const [campusFilter, setCampusFilter] = useState('');
  const [matchFilter, setMatchFilter] = useState(0);

  // Pour la modal de détails sur une formation
  const [showFormationModal, setShowFormationModal] = useState(false);
  const [modalFormation, setModalFormation] = useState(null);

  useEffect(() => {
    let f = [...mockFormations];

    // Filtrage par recherche
    if (searchTerm) {
      f = f.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filtrage par durée
    if (durationFilter) {
      f = f.filter((x) => x.duration === durationFilter);
    }

    // Filtrage par campus
    if (campusFilter) {
      f = f.filter((x) => x.campus === campusFilter);
    }

    // Filtrage par match minimal
    if (matchFilter > 0) {
      f = f.filter((x) => x.match >= matchFilter);
    }

    setFilteredFormations(f);
  }, [searchTerm, durationFilter, campusFilter, matchFilter]);

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
    setShowUpload(false);
    // On pourrait ici simuler une analyse du fichier pour ajuster le "match" des formations
  };

  const handleApply = (formationId: number) => {
    navigate(`/apply/${formationId}`);
  };

  const toggleFormationDetails = (id: number) => {
    setSelectedFormation(selectedFormation === id ? null : id);
  };

  const openFormationModal = (formation) => {
    setModalFormation(formation);
    setShowFormationModal(true);
  };

  // Récupérer toutes les durées et les campus uniques pour les filtres
  const uniqueDurations = [...new Set(mockFormations.map(f => f.duration))];
  const uniqueCampus = [...new Set(mockFormations.map(f => f.campus))];

  // Onglets pour différentes fonctionnalités
  const [activeTab, setActiveTab] = useState('formations');

  // Simulateur de profil (juste un placeholder)
  const [simulateurResult, setSimulateurResult] = useState(null);

  const runSimulateur = () => {
    // Simple mock : on calcule une recommandation aléatoire
    const bestFormation = mockFormations[Math.floor(Math.random() * mockFormations.length)];
    setSimulateurResult(bestFormation);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Bandeau d'accueil */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1 }}
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Espace Étudiant - Parcoursup
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
          Bienvenue dans votre espace personnel dédié à la découverte, à la comparaison et à la préparation de vos choix de formations post-bac.  
          Ici, vous pouvez rechercher des formations, importer vos notes pour des recommandations personnalisées, consulter un calendrier détaillé, et explorer de nombreuses ressources pour construire votre avenir.
        </p>
      </motion.div>

      {/* Onglets de navigation interne */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={()=>setActiveTab('formations')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'formations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Formations
          </button>
          <button
            onClick={()=>setActiveTab('recommandations')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recommandations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recommandations
          </button>
          <button
            onClick={()=>setActiveTab('documents')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documents & Ressources
          </button>
          <button
            onClick={()=>setActiveTab('faq')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQ
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'formations' && (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Rechercher des Formations</h2>
            <p className="text-gray-600 mb-4">
              Utilisez la barre de recherche ci-dessous pour trouver la formation idéale. Vous pouvez également importer vos relevés de notes pour obtenir des suggestions personnalisées.
            </p>
            
            {/* Barre de recherche et Import */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Importer mes notes
                  </button>
                  <button
                    onClick={()=>{setDurationFilter('');setCampusFilter('');setMatchFilter(0);setSearchTerm('');}}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            {showUpload && (
              <div className="mb-8">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            )}

            {/* Filtres avancés */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Filtres Avancés</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                  <select 
                    value={durationFilter}
                    onChange={e=>setDurationFilter(e.target.value)}
                    className="w-full border-gray-300 rounded-md"
                  >
                    <option value="">Toutes</option>
                    {uniqueDurations.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select 
                    value={campusFilter}
                    onChange={e=>setCampusFilter(e.target.value)}
                    className="w-full border-gray-300 rounded-md"
                  >
                    <option value="">Tous</option>
                    {uniqueCampus.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taux de match minimum</label>
                  <input 
                    type="range"
                    min={0}
                    max={100}
                    value={matchFilter}
                    onChange={e=>setMatchFilter(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">Minimum : {matchFilter}%</div>
                </div>
              </div>
            </div>

            {/* Liste des formations */}
            <div className="grid gap-6 md:grid-cols-2 mb-16">
              {filteredFormations.map((formation) => (
                <motion.div
                  key={formation.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity:0, y:20 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">{formation.name}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                        ${formation.match > 90 ? 'bg-green-100 text-green-800' :
                          formation.match > 70 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {formation.match}% match
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Prérequis:</span> {formation.requirements}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Places disponibles:</span> {formation.places}
                      </p>
                      
                      {selectedFormation === formation.id && (
                        <div className="mt-4 space-y-4 border-t pt-4">
                          <p className="text-sm text-gray-600">{formation.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{formation.startDate}</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{formation.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{formation.places} places</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{formation.campus}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApply(formation.id)}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
                            >
                              Postuler
                            </button>
                            <button
                              onClick={()=>openFormationModal(formation)}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                            >
                              Plus d'infos
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => toggleFormationDetails(formation.id)}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        {selectedFormation === formation.id ? 'Voir moins' : 'En savoir plus'}
                        <ChevronRight className={`ml-2 h-5 w-5 transform transition-transform ${
                          selectedFormation === formation.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredFormations.length === 0 && (
                <div className="text-gray-700 text-center col-span-2">
                  Aucune formation ne correspond à ces critères.
                </div>
              )}
            </div>

            {/* Calendrier des dates clés */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendrier des Dates Clés</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>10 Janvier :</strong> Ouverture de la plateforme et consultation des formations.</li>
                <li><strong>20 Mars :</strong> Date limite pour ajouter des vœux.</li>
                <li><strong>2 Avril :</strong> Finalisation du dossier et confirmation des vœux.</li>
                <li><strong>Fin Mai :</strong> Début de la phase d’admission (réponses des établissements).</li>
                <li><strong>Juillet :</strong> Inscriptions administratives dans les formations acceptées.</li>
              </ul>
            </div>

          </section>
        </div>
      )}

      {activeTab === 'recommandations' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Recommandations Personnalisées</h2>
          <p className="text-gray-600 mb-4">
            Basées sur vos notes, vos centres d’intérêt, et les informations que vous nous fournissez, nous pouvons vous proposer des formations susceptibles de vous intéresser.
          </p>

          <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Simulateur de Profil</h3>
            <p className="text-gray-700">
              Renseignez quelques informations supplémentaires (optionnel) et lancez le simulateur pour obtenir une suggestion de formation :
            </p>

            {/* Simulateur (juste un bouton qui choisit une formation aléatoirement) */}
            <button
              onClick={runSimulateur}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Wand className="h-5 w-5 mr-2" />
              Lancer le Simulateur
            </button>

            {simulateurResult && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <h4 className="font-semibold text-gray-900">Recommandation :</h4>
                <p className="text-gray-700"><strong>{simulateurResult.name}</strong> (Match : {simulateurResult.match}%)</p>
                <p className="text-sm text-gray-600 italic">Ceci est une suggestion basée sur des données fictives.</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aides & Conseils</h3>
            <p className="text-gray-700 mb-4">Découvrez des guides, des articles, des vidéos pour vous aider dans votre orientation :</p>
            <ul className="list-disc ml-5 text-blue-600 underline">
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Guide : Comment choisir sa formation ?</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Vidéo : Présentation des principaux cursus universitaires</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Article : Les débouchés dans le numérique</a></li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Documents & Ressources</h2>
          <p className="text-gray-600">
            Retrouvez ici tous vos documents importants, notes, et outils pour préparer vos candidatures :  
            relevés de notes, lettres de motivation, CV, fiches de présentation des formations, etc.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Relevés de Notes</h3>
              <p className="text-gray-700 flex-1">Téléchargez ou importez vos relevés de notes. Ces documents nous aideront à vous conseiller des formations adaptées.</p>
              <div className="mt-4">
                <button
                  onClick={()=>setShowUpload(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Importer mes relevés
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lettres de Motivation</h3>
              <p className="text-gray-700 flex-1">Conservez vos lettres de motivation, préparez-les en avance, et adaptez-les à chaque formation. Vous pouvez les modifier à tout moment.</p>
              <div className="mt-4">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  <PenTool className="h-5 w-5 mr-2"/>
                  Gérer mes lettres
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Supports Officiels</h3>
              <p className="text-gray-700 flex-1">Accédez à des brochures, fiches récapitulatives des formations, rapports officiels, et guides pratiques en un clic.</p>
              <div className="mt-4 flex space-x-2">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-5 w-5 mr-2"/>
                  Télécharger un guide
                </button>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  <ExternalLink className="h-5 w-5 mr-2"/>
                  Liens utiles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Foire Aux Questions</h2>
          <p className="text-gray-600">Retrouvez ici les réponses aux questions les plus fréquemment posées par les étudiants.</p>

          <div className="space-y-4">
            <details className="bg-white p-4 rounded-md shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex items-center justify-between">
                Comment fonctionne le calcul du taux de match ?
                <ChevronRight className="h-5 w-5" />
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Le taux de match est calculé à partir de vos relevés de notes, de vos centres d’intérêt, des prérequis de la formation, et d’autres critères. Plus ce taux est élevé, plus la formation est susceptible de vous convenir.
              </p>
            </details>

            <details className="bg-white p-4 rounded-md shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex items-center justify-between">
                Puis-je modifier mes vœux après la date limite ?
                <ChevronRight className="h-5 w-5" />
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Après la date limite, vous ne pouvez plus ajouter de nouveaux vœux, mais vous pouvez encore finaliser votre dossier jusqu’à la date de confirmation. Veillez à bien respecter les échéances du calendrier.
              </p>
            </details>

            <details className="bg-white p-4 rounded-md shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex items-center justify-between">
                Comment obtenir plus d’informations sur une formation ?
                <ChevronRight className="h-5 w-5" />
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Vous pouvez cliquer sur le bouton « Plus d’infos » sous chaque formation pour accéder à des détails supplémentaires, des liens utiles, des statistiques d’insertion professionnelle, et des contacts.
              </p>
            </details>

            <details className="bg-white p-4 rounded-md shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex items-center justify-between">
                Quelles ressources sont disponibles pour m’aider dans mon orientation ?
                <ChevronRight className="h-5 w-5" />
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">
                De nombreux outils sont à votre disposition : simulateur de profil, guides, vidéos, liens vers des sites officiels, brochures des universités, forums d’étudiants, et bien plus encore.
              </p>
            </details>
          </div>
        </div>
      )}

      <FormationModal 
        isOpen={showFormationModal}
        onClose={()=>setShowFormationModal(false)}
        formation={modalFormation}
      />
    </div>
  );
}
