import { apiClient } from '@/api';
import { User, UserProfile } from '@/types';

const MOCK_USER: UserProfile = {
  id: 'usr-001',
  name: 'Alex Mercer',
  email: 'a.mercer@iob.enterprise.internal',
  role: 'Lead Diagnostic Engineer',
  shift: 'Shift A (06:00 - 18:00)',
  permissions: ['HAZARD_INJECT', 'TELEMETRY_OVERRIDE', 'MODEL_RETRAIN', 'EMERGENCY_TRIP'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
};

/**
 * Section 8 Service Interface Mapping: UserService
 * Integrated with existing Section 7 decoupled network layer (apiClient).
 */
export const UserService = {
  /**
   * TODO: Map organizational ACL privileges and profile claims in Phase 2.
   */
  async getProfile(): Promise<User | null> {
    try {
      return await apiClient.get<User>('/api/v1/users/profile');
    } catch {
      return null;
    }
  },
  async getCurrentUser(): Promise<UserProfile> {
    try {
      return await apiClient.get<UserProfile>('/api/v1/users/me');
    } catch {
      return MOCK_USER;
    }
  },
};

// Backwards-compatible alias for existing Section 7 repo wiring
export const userService = UserService;
