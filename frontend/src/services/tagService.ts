// ==============================================
// Tag Service
// ==============================================

import api from './api';
import type { Tag } from '@/types';

export const tagService = {
  /**
   * Get all tags
   */
  async getAll() {
    const response = await api.get<{ tags: Tag[] }>('/tags');
    return response.data.tags;
  },
};

