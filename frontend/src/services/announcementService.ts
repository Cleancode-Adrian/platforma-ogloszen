// ==============================================
// Announcement Service
// ==============================================

import api from './api';
import type {
  Announcement,
  PaginatedResponse,
  AnnouncementFormData,
  AnnouncementFilters,
} from '@/types';

export const announcementService = {
  /**
   * Get all published announcements (paginated)
   */
  async getAll(filters?: AnnouncementFilters) {
    const response = await api.get<PaginatedResponse<Announcement>>('/announcements', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get single announcement
   */
  async getById(id: number | string) {
    const response = await api.get<{ announcement: Announcement }>(`/announcements/${id}`);
    return response.data.announcement;
  },

  /**
   * Get user's own announcements
   */
  async getMyAnnouncements(page = 1) {
    const response = await api.get<PaginatedResponse<Announcement>>('/my-announcements', {
      params: { page },
    });
    return response.data;
  },

  /**
   * Create new announcement
   */
  async create(data: AnnouncementFormData) {
    const response = await api.post<{
      message: string;
      announcement: Announcement;
    }>('/announcements', data);
    return response.data;
  },

  /**
   * Update announcement
   */
  async update(id: number | string, data: Partial<AnnouncementFormData>) {
    const response = await api.put<{
      message: string;
      announcement: Announcement;
    }>(`/announcements/${id}`, data);
    return response.data;
  },

  /**
   * Delete announcement
   */
  async delete(id: number | string) {
    const response = await api.delete<{ message: string }>(`/announcements/${id}`);
    return response.data;
  },
};

