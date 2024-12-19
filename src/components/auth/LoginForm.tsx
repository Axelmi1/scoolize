// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { GraduationCap, Building2, ExternalLink, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  role: z.enum(['student', 'admin']), // Suppression de 'admin'
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: selectedRole,
      email: '',
      password: '',
    }
  });
  const { setUser } = useAuthStore();

  const onSubmit = (data: LoginFormData) => {
    const user = {
      id: '1',
      name: data.role === 'student' ? 'Étudiant' : 'Établissement',
      email: data.email,
      role: data.role,
    };
    setUser(user);
    
    // Redirection vers /preparer pour tous les utilisateurs
    navigate('/preparer');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Connexion à Scoolize</h2>
        <p className="mt-2 text-gray-600">Accédez à votre espace personnel</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Choix du rôle */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedRole === 'student'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Étudiant</span>
            <input
              type="radio"
              {...register('role')}
              value="student"
              className="sr-only"
              checked={selectedRole === 'student'}
              onChange={() => setSelectedRole('student')}
            />
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedRole === 'admin'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <Building2 className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Établissement</span>
            <input
              type="radio"
              {...register('role')}
              value="admin"
              className="sr-only"
              checked={selectedRole === 'admin'}
              onChange={() => setSelectedRole('admin')}
            />
          </button>
        </div>

        {/* Champ Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="votre.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Champ Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>

      {/* Autres méthodes de connexion */}
      <div className="mt-8">
        <div className="text-center mb-4">
          <span className="text-gray-500 text-sm">ou se connecter avec :</span>
        </div>

        <div className="space-y-4">
          {/* FranceConnect */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
          >
            <img
              src="/src/components/images/franco.png" // Chemin mis à jour pour FranceConnect
              alt="FranceConnect"
              className="h-5 w-auto mr-3"
            />
            <span className="text-sm font-medium text-gray-700">FranceConnect</span>
            <ExternalLink className="h-4 w-4 text-gray-400 ml-2" />
          </button>

          {/* Identité Numérique La Poste */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
          >
            <img
              src="/src/components/images/laposte.png" // Chemin mis à jour pour Identité Numérique La Poste
              alt="Identité Numérique La Poste"
              className="h-5 w-auto mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Identité Numérique La Poste</span>
            <ExternalLink className="h-4 w-4 text-gray-400 ml-2" />
          </button>

          {/* Autres solutions d'identité numériques */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
          >
            <Lock className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-sm font-medium text-gray-700">Autre solution d'identité numérique</span>
            <ExternalLink className="h-4 w-4 text-gray-400 ml-2" />
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Ces options sont fournies à titre d’exemple. Aucune information ne sera réellement transmise.
        </p>
      </div>
    </div>
  );
}