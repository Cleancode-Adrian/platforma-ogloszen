import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore()

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <Outlet />
    </div>
  )
}

export default AuthLayout

