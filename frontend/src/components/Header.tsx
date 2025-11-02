import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-code text-white text-sm"></i>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">WebFreelance</span>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/announcements" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Ogłoszenia
              </Link>
              <a href="#jak-to-dziala" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Jak to działa
              </a>
              <a href="#dla-freelancerow" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dla freelancerów
              </a>
              <a href="#cennik" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Cennik
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">
                  Panel użytkownika
                </Link>
                <Link to="/announcements/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Dodaj ogłoszenie
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">
                  Zaloguj się
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Zarejestruj się
                </Link>
              </>
            )}
            <button className="md:hidden text-gray-600 hover:text-gray-900">
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

