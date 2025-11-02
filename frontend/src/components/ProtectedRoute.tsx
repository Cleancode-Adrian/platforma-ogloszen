import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user && !user.is_approved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-clock text-yellow-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Konto oczekuje na zatwierdzenie</h2>
          <p className="text-gray-600 mb-6">
            Twoje konto zostało utworzone i oczekuje na zatwierdzenie przez administratora.
            Otrzymasz powiadomienie email gdy Twoje konto zostanie aktywowane.
          </p>
          <button
            onClick={() => useAuthStore.getState().logout()}
            className="btn-secondary"
          >
            Wyloguj się
          </button>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedRoute

