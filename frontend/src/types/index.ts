// ==============================================
// TypeScript Types & Interfaces
// ==============================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  is_approved: boolean;
  phone?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  color: string;
  description?: string;
  is_active: boolean;
  order: number;
  active_announcements_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface AnnouncementRequirement {
  id: number;
  announcement_id: number;
  requirement: string;
  created_at: string;
}

export interface AnnouncementAttachment {
  id: number;
  announcement_id: number;
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  file_url?: string;
  file_size_human?: string;
}

export interface Announcement {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  budget_currency: string;
  budget_range?: string;
  deadline?: string;
  location?: string;
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'closed';
  is_approved: boolean;
  is_urgent: boolean;
  rejection_reason?: string;
  approved_at?: string;
  views_count: number;
  proposals_count: number;
  created_at: string;
  updated_at: string;

  // Relations
  user?: User;
  category?: Category;
  tags?: Tag[];
  requirements?: AnnouncementRequirement[];
  attachments?: AnnouncementAttachment[];
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  company?: string;
}

export interface AnnouncementFormData {
  category_id: number;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: string;
  location?: string;
  is_urgent?: boolean;
  requirements?: string[];
  tags?: number[];
}

export interface AnnouncementFilters {
  category?: string;
  budget_min?: number;
  budget_max?: number;
  search?: string;
  tags?: string;
  page?: number;
}

