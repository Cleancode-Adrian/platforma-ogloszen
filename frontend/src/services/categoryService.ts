// ==============================================
// Category Service
// ==============================================

import api from './api';
import type { Category } from '@/types';

export const categoryService = {
  /**
   * Get all active categories
   */
  async getAll() {
    const response = await api.get<{ categories: Category[] }>('/categories');
    return response.data.categories;
  },

  /**
   * Get single category by slug
   */
  async getBySlug(slug: string) {
    const response = await api.get<{ category: Category }>(`/categories/${slug}`);
    return response.data.category;
  },
};

