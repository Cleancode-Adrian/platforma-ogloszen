// ==============================================
// Authentication Service
// ==============================================

import api from './api';
import type { User, LoginCredentials, RegisterData } from '@/types';

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials) {
    const response = await api.post<{
      message: string;
      user: User;
      token: string;
    }>('/auth/login', credentials);

    // Store token and user
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  /**
   * Register new user
   */
  async register(data: RegisterData) {
    const response = await api.post<{
      message: string;
      user: User;
    }>('/auth/register', data);

    return response.data;
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user
   */
  async me() {
    const response = await api.get<{ user: User }>('/auth/me');

    // Update stored user
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data.user;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get stored user
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

