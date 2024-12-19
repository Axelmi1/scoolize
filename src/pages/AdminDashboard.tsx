import React from 'react';
import { Users, BookOpen, Bell, ChevronRight } from 'lucide-react';

const mockApplications = [
  {
    id: 1,
    name: 'Jean Dupont',
    formation: 'Licence Informatique',
    status: 'En attente',
    date: '2024-03-15',
  },
  {
    id: 2,
    name: 'Marie Martin',
    formation: 'Master Data Science',
    status: 'Acceptée',
    date: '2024-03-14',
  },
  {
    id: 3,
    name: 'Pierre Durant',
    formation: 'Licence Informatique',
    status: 'En cours d\'examen',
    date: '2024-03-13',
  },
];

const stats = [
  { id: 1, name: 'Candidatures totales', value: '156', icon: Users },
  { id: 2, name: 'Formations actives', value: '12', icon: BookOpen },
  { id: 3, name: 'Nouvelles candidatures', value: '23', icon: Bell },
];

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord Établissement</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white overflow-hidden shadow-sm rounded-lg p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Dernières candidatures</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {mockApplications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{application.name}</p>
                        <p className="text-sm text-gray-500">{application.formation}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            application.status === 'Acceptée'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'En attente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {application.status}
                      </span>
                      <ChevronRight className="ml-4 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Soumise le {new Date(application.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
