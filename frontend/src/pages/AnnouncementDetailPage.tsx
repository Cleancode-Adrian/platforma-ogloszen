import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { announcementService } from '@/services/announcementService'
import type { Announcement } from '@/types'

const AnnouncementDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadAnnouncement(id)
    }
  }, [id])

  const loadAnnouncement = async (announcementId: string) => {
    setLoading(true)
    try {
      const data = await announcementService.getById(announcementId)
      setAnnouncement(data)
    } catch (err: any) {
      setError('Nie znaleziono ogłoszenia')
      console.error('Błąd:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie ogłoszenia...</p>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono ogłoszenia</h2>
          <p className="text-gray-600 mb-6">Ogłoszenie może zostać usunięte lub nie istnieje.</p>
          <Link to="/announcements" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            ← Wróć do listy ogłoszeń
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-4 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              🏠 Strona główna
            </Link>
            <span className="text-gray-400">›</span>
            <Link to="/announcements" className="text-gray-500 hover:text-gray-700">
              Ogłoszenia
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{announcement.title}</span>
          </nav>
        </div>
      </section>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span 
                        className="px-3 py-1 text-sm font-medium rounded-full mr-3"
                        style={{ 
                          backgroundColor: `${announcement.category?.color}20`,
                          color: announcement.category?.color 
                        }}
                      >
                        {announcement.category?.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        Dodano {new Date(announcement.created_at).toLocaleDateString('pl-PL')}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <div className="flex items-center">
                        <span className="text-green-500 text-xl mr-2">💰</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {announcement.budget_range}
                        </span>
                      </div>
                      
                      {announcement.deadline && (
                        <div className="flex items-center">
                          <span className="text-blue-500 text-xl mr-2">⏰</span>
                          <span className="text-gray-600">Termin: {announcement.deadline}</span>
                        </div>
                      )}
                      
                      {announcement.location && (
                        <div className="flex items-center">
                          <span className="text-red-500 text-xl mr-2">📍</span>
                          <span className="text-gray-600">{announcement.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {announcement.is_urgent && (
                    <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                      <span className="text-xl">🔥</span>
                      <span className="text-sm font-semibold text-red-700">Projekt pilny</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {announcement.tags && announcement.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {announcement.tags.map((tag) => (
                      <span key={tag.id} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👁️</span>
                    <span>{announcement.views_count} wyświetleń</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Opis projektu</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {announcement.description}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Zainteresował Cię ten projekt?</h3>
                  <p className="text-blue-100 mb-6">
                    Zaloguj się aby wysłać ofertę do zleceniodawcy
                  </p>
                  <Link 
                    to="/login"
                    className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    📧 Wyślij ofertę
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              
              {/* Author Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {announcement.user?.name?.[0] || 'U'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.user?.name}</h3>
                  {announcement.user?.company && (
                    <p className="text-sm text-gray-600 mt-1">{announcement.user.company}</p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Członek od:</span>
                    <span className="font-medium">
                      {new Date(announcement.user?.created_at || '').toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  {announcement.user?.phone && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Telefon:</span>
                      <span className="font-medium">{announcement.user.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
                  >
                    📧 Wyślij ofertę
                  </Link>
                  <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                    💬 Zadaj pytanie
                  </button>
                  <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                    🔖 Zapisz projekt
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Bezpieczeństwo</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Płatność zabezpieczona</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Gwarancja realizacji</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statystyki projektu</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wyświetlenia</span>
                    <span className="font-semibold text-gray-900">{announcement.views_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-green-600">Aktywne</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kategoria</span>
                    <span className="font-semibold text-gray-900">{announcement.category?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bezpieczeństwo */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🛡️
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Bezpieczna współpraca</h2>
            <p className="text-xl text-blue-100 mb-8">
              WebFreelance zapewnia bezpieczne środowisko dla wszystkich projektów
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Weryfikacja tożsamości</h3>
              <p className="text-blue-100">Wszyscy użytkownicy przechodzą proces weryfikacji</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
                💳
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Escrow płatności</h3>
              <p className="text-blue-100">Pieniądze są zabezpieczone do zakończenia projektu</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
                🎧
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Wsparcie 24/7</h3>
              <p className="text-blue-100">Nasz zespół pomoże w razie problemów</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AnnouncementDetailPage
