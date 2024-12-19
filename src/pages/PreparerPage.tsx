import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Filter, PieChart, BarChart, Search, X, UserCheck, UserX, Users, Check, XCircle, ChevronRight, FileText, Layers, Calendar, Award, Globe, BookOpen, Heart, Lightbulb, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cette page est un espace établissement ultra complet, avec plus de 600 lignes.
 * Elle propose : 
 * - Une gestion des formations (tableau, ajout, édition, suppression, filtrage)
 * - Des outils d'analyse (placeholders de graphiques, filtres)
 * - Une liste détaillée de candidats avec profil complet, possibilité d'accepter/refuser
 * - Des modals pour chaque action (édition, suppression, détails)
 * - Un design épuré et cohérent
 */

// -------------------------------------------------------------------------
// Données fictives pour les formations
// -------------------------------------------------------------------------
const mockFormations = [
  {
    id: 1,
    name: 'Licence Informatique',
    requirements: 'Bac S ou STI2D',
    places: 150,
    applications: 423,
    description: 'Une formation solide en informatique fondamentale, algorithmique, structures de données, systèmes, bases de données et réseaux.',
    campus: 'Paris-Saclay',
    level: 'Licence (L3)',
  },
  {
    id: 2,
    name: 'Master Data Science',
    requirements: 'Licence Informatique ou Mathématiques',
    places: 50,
    applications: 180,
    description: 'Formation avancée en science des données, machine learning, big data, et intelligence artificielle. Prépare à des carrières de data scientist.',
    campus: 'Sorbonne Université',
    level: 'Master (M2)',
  },
  {
    id: 3,
    name: 'BUT Génie Civil',
    requirements: 'Bac S, STI2D, ou bac pro avec mention',
    places: 80,
    applications: 250,
    description: 'Formation professionnalisante dans le domaine du génie civil. Apprentissage des techniques de construction, matériaux, management de chantier.',
    campus: 'IUT de Villetaneuse',
    level: 'BUT (3 ans)',
  },
];

// -------------------------------------------------------------------------
// Données fictives pour les candidats
// Chaque candidat a un profil avec notes, lettre de motivation, statut.
// -------------------------------------------------------------------------
const mockCandidates = [
  {
    id: 101,
    name: 'Jean Dupont',
    formation: 'Licence Informatique',
    status: 'En attente',
    date: '2024-03-15',
    notes: {
      math: 16,
      physique: 14,
      informatique: 17,
      philosophie: 12,
    },
    motivationLetter: 'Je suis passionné par l’informatique depuis mon plus jeune âge, je code depuis le lycée...',
    comments: 'Excellents résultats, très motivé, a déjà participé à des hackathons.'
  },
  {
    id: 102,
    name: 'Marie Martin',
    formation: 'Master Data Science',
    status: 'Acceptée',
    date: '2024-03-14',
    notes: {
      math: 18,
      informatique: 19,
      stats: 17,
      anglais: 15,
    },
    motivationLetter: 'La data science est au cœur de mes passions. Mon objectif est d’extraire de la valeur des données...',
    comments: 'Profil excellent, stage chez un grand acteur du big data, très recommandée.'
  },
  {
    id: 103,
    name: 'Pierre Durant',
    formation: 'Licence Informatique',
    status: 'En cours d\'examen',
    date: '2024-03-13',
    notes: {
      math: 14,
      physique: 13,
      informatique: 15,
      anglais: 14,
    },
    motivationLetter: 'J’aime l’informatique et je souhaite approfondir mes connaissances dans le domaine du développement logiciel...',
    comments: 'Bon profil, notes correctes, semble motivé.'
  },
  {
    id: 104,
    name: 'Sophie Bernard',
    formation: 'BUT Génie Civil',
    status: 'Refusée',
    date: '2024-03-12',
    notes: {
      math: 10,
      physique: 11,
      techno: 12,
      anglais: 10,
    },
    motivationLetter: 'Le génie civil représente pour moi l’ingénierie au service de la société. Je veux contribuer à construire le futur...',
    comments: 'Notes moyennes, motivation correcte mais pas assez pour le quota limité.'
  },
];

// -------------------------------------------------------------------------
// Composants modals et sub-composants pour la gestion
// -------------------------------------------------------------------------

function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
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

// Modal pour ajouter/éditer une formation
function FormationModal({ isOpen, onClose, onSave, formation }) {
  const [formData, setFormData] = useState(
    formation || {
      name: '',
      requirements: '',
      places: '',
      applications: '',
      description: '',
      campus: '',
      level: '',
    }
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Valider les données ici
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={formation ? "Modifier la formation" : "Ajouter une formation"}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prérequis</label>
          <input 
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Places</label>
            <input 
              type="number"
              name="places"
              value={formData.places}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Candidatures</label>
            <input 
              type="number"
              name="applications"
              value={formData.applications}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Campus</label>
          <input 
            type="text"
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Niveau</label>
          <input 
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button 
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          Annuler
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </Modal>
  );
}

// Modal pour supprimer une formation
function DeleteFormationModal({ isOpen, onClose, onDelete, formation }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Supprimer la formation">
      <p className="text-gray-700 mb-4">
        Êtes-vous sûr de vouloir supprimer la formation <strong>{formation?.name}</strong> ?
        Cette action est irréversible.
      </p>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          Annuler
        </button>
        <button 
          onClick={() => {
            onDelete(formation.id);
            onClose();
          }}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
}

// Modal pour afficher le détail d'un candidat et permettre de l'accepter ou de le refuser
function CandidateModal({ isOpen, onClose, candidate, onAccept, onRefuse }) {
  if(!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Candidat : ${candidate.name}`}>
      <div className="space-y-4 text-gray-700">
        <p><strong>Formation demandée :</strong> {candidate.formation}</p>
        <p><strong>Date de candidature :</strong> {new Date(candidate.date).toLocaleDateString()}</p>

        <div>
          <h3 className="font-semibold mb-2">Notes</h3>
          <ul className="list-disc ml-5">
            {Object.entries(candidate.notes).map(([matiere, note]) => (
              <li key={matiere}>{matiere.charAt(0).toUpperCase() + matiere.slice(1)} : {note}/20</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Lettre de motivation</h3>
          <p className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap">
            {candidate.motivationLetter}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Commentaires internes</h3>
          <p className="text-sm italic">{candidate.comments}</p>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button 
            onClick={() => {
              onRefuse(candidate.id);
              onClose();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200"
          >
            <UserX className="h-5 w-5 mr-2" />
            Refuser
          </button>
          <button 
            onClick={() => {
              onAccept(candidate.id);
              onClose();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-green-600 bg-green-100 hover:bg-green-200"
          >
            <UserCheck className="h-5 w-5 mr-2" />
            Accepter
          </button>
        </div>
      </div>
    </Modal>
  );
}

// -------------------------------------------------------------------------
// Composant principal
// -------------------------------------------------------------------------
export function PreparerPage() {
  const [formations, setFormations] = useState(mockFormations);
  const [candidates, setCandidates] = useState(mockCandidates);
  
  // États pour les modals
  const [showFormationModal, setShowFormationModal] = useState(false);
  const [editFormation, setEditFormation] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFormationData, setDeleteFormationData] = useState(null);

  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // États de filtrage et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [formationFilter, setFormationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fonctions de gestion des formations
  const handleAddFormation = () => {
    setEditFormation(null);
    setShowFormationModal(true);
  };

  const handleEditFormation = (formation) => {
    setEditFormation(formation);
    setShowFormationModal(true);
  };

  const handleSaveFormation = (data) => {
    if(editFormation) {
      // Edition
      setFormations(prev => prev.map(f => f.id === editFormation.id ? {...f, ...data} : f));
    } else {
      // Ajout
      const newId = Math.max(...formations.map(f => f.id)) + 1;
      setFormations(prev => [...prev, { ...data, id:newId }]);
    }
  };

  const handleDeleteFormation = (id) => {
    setFormations(prev => prev.filter(f => f.id !== id));
  };

  // Fonctions pour les candidats
  const handleAcceptCandidate = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? {...c, status:'Acceptée'} : c));
  };

  const handleRefuseCandidate = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? {...c, status:'Refusée'} : c));
  };

  const filteredCandidates = candidates
    .filter(c => {
      if(formationFilter && c.formation !== formationFilter) return false;
      if(statusFilter && c.status !== statusFilter) return false;
      if(searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

  const uniqueFormations = [...new Set(candidates.map(c => c.formation))];

  const uniqueStatuses = [...new Set(candidates.map(c => c.status))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Titre et description */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Espace Établissement</h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Bienvenue dans votre espace établissement. Ici, vous pouvez :  
        <ul className="list-disc ml-5 mt-2">
          <li>Gérer et mettre à jour les formations que vous proposez</li>
          <li>Analyser les candidatures, filtrer par critères, et sélectionner les meilleurs profils</li>
          <li>Consulter des statistiques sur l’affluence, la diversité des candidats, et la satisfaction</li>
          <li>Optimiser votre calendrier d’admission et vos processus internes</li>
        </ul>
      </p>

      {/* Gestion des formations */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Formations</h2>
        <button 
          onClick={handleAddFormation}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter une formation
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Formation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prérequis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Places
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidatures
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formations.map((formation) => (
              <tr key={formation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formation.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formation.requirements}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formation.places}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formation.applications}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditFormation(formation)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setDeleteFormationData(formation);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outils d'analyse et statistiques */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Outils d’Analyse</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Filtrez les candidatures selon des critères (résultats scolaires, spécialités du lycée, région d’origine, etc.) pour affiner votre sélection.
          Vous pouvez également explorer des graphiques pour visualiser la répartition des candidatures, identifier les tendances, 
          et ajuster vos campagnes de communication.
        </p>
        <button className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
          <Filter className="h-5 w-5 mr-2" />
          Ajouter un Filtre
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-8 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Répartition des Candidatures</h3>
          <p className="text-gray-600 mb-4">
            Visualisez la provenance des candidats, les filières d’origine, et l’évolution du nombre de candidatures.
          </p>
          <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 italic">
            <PieChart className="h-12 w-12" />
            <span className="ml-2">Graphique (en cours d’intégration)</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tendances et Évolution</h3>
          <p className="text-gray-600 mb-4">
            Comparez les candidatures entre différentes formations, repérez les périodes de forte affluence, et optimisez vos campagnes.
          </p>
          <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 italic">
            <BarChart className="h-12 w-12" />
            <span className="ml-2">Graphique (en cours d’intégration)</span>
          </div>
        </div>
      </div>

      {/* Liste des candidats */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des Candidatures</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Ci-dessous, retrouvez l’ensemble des candidats ayant postulé à vos formations. Filtrez par formation, statut, ou recherchez par nom. 
          Consultez le profil détaillé de chaque candidat, puis acceptez ou refusez la candidature selon vos critères.
        </p>

        {/* Zone de filtres */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher un candidat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
            <select 
              value={formationFilter}
              onChange={(e)=>setFormationFilter(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            >
              <option value="">Toutes</option>
              {uniqueFormations.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select 
              value={statusFilter}
              onChange={(e)=>setStatusFilter(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            >
              <option value="">Tous</option>
              {uniqueStatuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {candidate.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.formation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            candidate.status === 'Acceptée'
                              ? 'bg-green-100 text-green-800'
                              : candidate.status === 'En attente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : candidate.status === 'Refusée'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(candidate.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setShowCandidateModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                    >
                      Voir détails
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    Aucun candidat ne correspond à ces critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* On pourrait ajouter encore plus de sections ici, comme un calendrier interactif,
          un export CSV des données, des onglets pour différents types de rapports, etc. 
          Mais la page est déjà très longue. */}

      {/* Modals */}
      <FormationModal 
        isOpen={showFormationModal} 
        onClose={() => setShowFormationModal(false)} 
        onSave={handleSaveFormation}
        formation={editFormation}
      />

      <DeleteFormationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteFormation}
        formation={deleteFormationData}
      />

      <CandidateModal 
        isOpen={showCandidateModal}
        onClose={() => setShowCandidateModal(false)}
        candidate={selectedCandidate}
        onAccept={handleAcceptCandidate}
        onRefuse={handleRefuseCandidate}
      />

    </div>
  );
}
