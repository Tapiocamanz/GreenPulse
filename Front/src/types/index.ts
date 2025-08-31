// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf?: string; // CPF opcional por enquanto
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Screen Types
export interface ScreenProps {
  onNavigate: (screen: string) => void;
}

// Reward Types
export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image?: string;
  category: string;
}

// Product/Service Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

// GPS Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select';
  required: boolean;
  options?: Array<{ value: string; label: string }>;
}
