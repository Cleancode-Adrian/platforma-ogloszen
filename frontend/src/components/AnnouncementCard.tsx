import { Link } from 'react-router-dom'
import type { Announcement } from '@/types'

interface AnnouncementCardProps {
  announcement: Announcement
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${announcement.category?.color}20`,
              color: announcement.category?.color
            }}
          >
            {announcement.category?.name}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(announcement.created_at).toLocaleDateString('pl-PL')}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {announcement.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {announcement.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">💰</span>
              <span className="font-semibold text-gray-900">
                {announcement.budget_range || 'Do uzgodnienia'}
              </span>
            </div>
            {announcement.deadline && (
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">⏰</span>
                <span className="text-sm text-gray-600">{announcement.deadline}</span>
              </div>
            )}
          </div>
        </div>

        {announcement.tags && announcement.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {announcement.tags.slice(0, 4).map((tag) => (
              <span key={tag.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white text-xs font-bold">
              {announcement.user?.name?.[0] || 'U'}
            </div>
            <span className="text-sm text-gray-600">{announcement.user?.name}</span>
          </div>
          <Link
            to={`/announcements/${announcement.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Zobacz szczegóły
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard

