import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { announcementService } from '@/services/announcementService'
import { categoryService } from '@/services/categoryService'
import { tagService } from '@/services/tagService'
import type { Category, Tag, AnnouncementFormData } from '@/types'

const AddAnnouncementPage = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<AnnouncementFormData>({
    category_id: 0,
    title: '',
    description: '',
    budget_min: undefined,
    budget_max: undefined,
    deadline: '',
    location: '',
    is_urgent: false,
    tags: [],
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        categoryService.getAll(),
        tagService.getAll(),
      ])
      setCategories(categoriesData)
      setTags(tagsData)
    } catch (error) {
      console.error('Błąd ładowania danych:', error)
    }
  }

  const handleTagToggle = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...(prev.tags || []), tagId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Walidacja
    if (!formData.category_id) {
      setError('Wybierz kategorię')
      setLoading(false)
      return
    }

    if (formData.budget_min && formData.budget_max && formData.budget_min > formData.budget_max) {
      setError('Budżet minimalny nie może być większy od maksymalnego')
      setLoading(false)
      return
    }

    try {
      await announcementService.create(formData)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Błąd podczas dodawania ogłoszenia')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ogłoszenie dodane!</h2>
          <p className="text-gray-600 mb-4">
            Twoje ogłoszenie zostało przesłane i oczekuje na zatwierdzenie przez administratora.
            Otrzymasz powiadomienie gdy zostanie opublikowane.
          </p>
          <p className="text-sm text-gray-500">Przekierowanie do panelu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dodaj nowe ogłoszenie</h1>
          <p className="text-gray-600">
            Wypełnij formularz aby dodać ogłoszenie. Po zatwierdzeniu przez administratora będzie widoczne publicznie.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kategoria */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kategoria projektu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category_id: category.id })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.category_id === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name[0]}
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">{category.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Podstawowe informacje */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Podstawowe informacje</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł ogłoszenia *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. Strona internetowa dla małej firmy"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Szczegółowy opis projektu *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={8}
                  placeholder="Opisz szczegółowo czego potrzebujesz: wymagania funkcjonalne, techniczne, oczekiwania..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length} znaków
                </p>
              </div>
            </div>
          </div>

          {/* Budżet i terminy */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Budżet i terminy</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budżet minimalny (PLN)
                </label>
                <input
                  type="number"
                  value={formData.budget_min || ''}
                  onChange={(e) => setFormData({ ...formData, budget_min: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. 3000"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budżet maksymalny (PLN)
                </label>
                <input
                  type="number"
                  value={formData.budget_max || ''}
                  onChange={(e) => setFormData({ ...formData, budget_max: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. 5000"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Termin realizacji
                </label>
                <input
                  type="text"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. 1 miesiąc, 2 tygodnie"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokalizacja
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. Warszawa, Polska"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_urgent || false}
                  onChange={(e) => setFormData({ ...formData, is_urgent: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Oznacz jako pilne 🔥
                </span>
              </label>
            </div>
          </div>

          {/* Tagi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Wymagane technologie (tagi)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Wybierz technologie wymagane w projekcie
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.tags?.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                  {formData.tags?.includes(tag.id) && ' ✓'}
                </button>
              ))}
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <p className="text-sm text-gray-600 mt-4">
                Wybrano: <span className="font-semibold">{formData.tags.length}</span> technologii
              </p>
            )}
          </div>

          {/* Podgląd */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Podgląd ogłoszenia</h2>

            <div className="bg-white rounded-lg p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tytuł:</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formData.title || '(brak tytułu)'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Kategoria:</p>
                <p className="font-medium text-gray-900">
                  {categories.find((c) => c.id === formData.category_id)?.name || '(nie wybrano)'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Budżet:</p>
                <p className="font-semibold text-green-600">
                  {formData.budget_min && formData.budget_max
                    ? `${formData.budget_min} - ${formData.budget_max} PLN`
                    : formData.budget_min
                    ? `Od ${formData.budget_min} PLN`
                    : formData.budget_max
                    ? `Do ${formData.budget_max} PLN`
                    : 'Do uzgodnienia'}
                </p>
              </div>

              {formData.deadline && (
                <div>
                  <p className="text-sm text-gray-600">Termin:</p>
                  <p className="font-medium text-gray-900">{formData.deadline}</p>
                </div>
              )}

              {formData.location && (
                <div>
                  <p className="text-sm text-gray-600">Lokalizacja:</p>
                  <p className="font-medium text-gray-900">{formData.location}</p>
                </div>
              )}

              {formData.is_urgent && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 inline-block">
                  <span className="text-sm font-semibold text-red-700">🔥 Projekt pilny</span>
                </div>
              )}
            </div>
          </div>

          {/* Przyciski */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Dodawanie...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Dodaj ogłoszenie
                </>
              )}
            </button>
          </div>
        </form>

        {/* Informacja o moderacji */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">ℹ️</span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Proces moderacji</h3>
              <p className="text-blue-800 mb-2">
                Wszystkie ogłoszenia przed publikacją przechodzą weryfikację przez administratora.
                Zwykle trwa to do 24 godzin.
              </p>
              <p className="text-sm text-blue-700">
                Otrzymasz powiadomienie email gdy ogłoszenie zostanie zatwierdzone lub odrzucone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAnnouncementPage
