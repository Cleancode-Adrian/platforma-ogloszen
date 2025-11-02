import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { announcementService } from '@/services/announcementService'
import { categoryService } from '@/services/categoryService'
import type { Announcement, Category } from '@/types'
import AnnouncementCard from '@/components/AnnouncementCard'

const HomePage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [announcementsData, categoriesData] = await Promise.all([
        announcementService.getAll({ page: 1 }),
        categoryService.getAll(),
      ])
      setAnnouncements(announcementsData.data.slice(0, 6)) // Pokaż tylko 6 najnowszych
      setCategories(categoriesData.slice(0, 8))
    } catch (error) {
      console.error('Błąd ładowania danych:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Znajdź wykonawcę <span className="text-blue-600">strony WWW</span> w kilka minut
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dodaj ogłoszenie i otrzymaj oferty od freelancerów zajmujących się tworzeniem i obsługą stron internetowych.
                Szybko, bezpiecznie i profesjonalnie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  <i className="fa-solid fa-plus mr-2"></i>
                  Dodaj ogłoszenie
                </Link>
                <Link
                  to="/announcements"
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Przeglądaj ogłoszenia
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2500+</div>
                  <div className="text-sm text-gray-600">Projektów</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1200+</div>
                  <div className="text-sm text-gray-600">Freelancerów</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Zadowolenia</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Announcements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Najnowsze ogłoszenia</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sprawdź najnowsze projekty i znajdź idealną okazję do rozwinięcia swojej kariery
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Ładowanie...</p>
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Brak ogłoszeń. Dodaj pierwsze!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/announcements"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all inline-block"
            >
              Zobacz wszystkie ogłoszenia
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Popularne kategorie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Znajdź freelancerów specjalizujących się w różnych obszarach rozwoju stron internetowych
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/announcements?category=${category.slug}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <span className="text-sm font-medium" style={{ color: category.color }}>
                  {category.active_announcements_count || 0} projektów
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="jak-to-dziala" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Jak to działa?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prosty proces w trzech krokach, który pozwoli Ci znaleźć idealnego freelancera
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-plus text-white text-2xl"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dodaj ogłoszenie</h3>
              <p className="text-gray-600 leading-relaxed">
                Opisz swój projekt, określ budżet i termin realizacji. To zajmie Ci tylko kilka minut.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-envelope text-white text-2xl"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Odbierz oferty</h3>
              <p className="text-gray-600 leading-relaxed">
                Freelancerzy będą składać oferty na Twój projekt. Porównaj ich doświadczenie i ceny.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-handshake text-white text-2xl"></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wybierz wykonawcę</h3>
              <p className="text-gray-600 leading-relaxed">
                Wybierz najlepszą ofertę i rozpocznij współpracę. Płać bezpiecznie przez naszą platformę.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Gotowy na start?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dołącz do tysięcy zadowolonych użytkowników i rozpocznij swoją przygodę z WebFreelance już dziś
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Dodaj ogłoszenie
            </Link>
            <Link
              to="/announcements"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Przeglądaj ogłoszenia
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

