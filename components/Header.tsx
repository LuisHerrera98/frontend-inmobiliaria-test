'use client';

import Link from 'next/link';
import { Home, Plus, User, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">InmobiliariaApp</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Propiedades
            </Link>
            <Link href="/crear" className="text-gray-700 hover:text-orange-500 font-medium">
              Publicar
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              href="/crear"
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Publicar</span>
            </Link>
            
            {status === 'loading' ? (
              <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      width={32}
                      height={32}
                      className="rounded-full w-6 h-6 sm:w-8 sm:h-8"
                    />
                  ) : (
                    <User className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                  <span className="hidden md:inline text-sm">{session.user.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 rounded-full"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}