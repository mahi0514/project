import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string, role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (role: UserRole) => {
    const dummyUser: User = {
      id: '1',
      name: role === 'college' ? 'Tech Institute' : role === 'sponsor' ? 'Global Corp' : 'Admin User',
      email: role === 'college' ? 'contact@tech.edu' : role === 'sponsor' ? 'partners@global.com' : 'admin@sponza.com',
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${role}&background=random`
    };
    set({ user: dummyUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  register: (name, email, role) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    set({ user: newUser, isAuthenticated: true });
  }
}));
