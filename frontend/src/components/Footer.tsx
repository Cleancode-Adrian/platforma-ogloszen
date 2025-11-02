import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-code text-white text-sm"></i>
              </div>
              <span className="ml-2 text-xl font-bold">WebFreelance</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Platforma łącząca klientów z najlepszymi freelancerami specjalizującymi się w tworzeniu stron internetowych.
              Bezpiecznie, szybko i profesjonalnie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Dla klientów</h3>
            <ul className="space-y-3">
              <li><Link to="/announcements/new" className="text-gray-400 hover:text-white transition-colors">Dodaj ogłoszenie</Link></li>
              <li><Link to="/announcements" className="text-gray-400 hover:text-white transition-colors">Przeglądaj ogłoszenia</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Jak to działa</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cennik</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bezpieczeństwo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Dla freelancerów</h3>
            <ul className="space-y-3">
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Rejestracja</Link></li>
              <li><Link to="/announcements" className="text-gray-400 hover:text-white transition-colors">Znajdź projekty</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Zarabianie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Porady</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Społeczność</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 WebFreelance. Wszystkie prawa zastrzeżone.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Regulamin</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Polityka prywatności</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Pomoc</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

