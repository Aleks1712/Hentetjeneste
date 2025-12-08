// API Client for Hentetjeneste Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Types matching backend models
export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: 'PARENT' | 'STAFF' | 'ADMIN';
  active: boolean;
}

export interface Child {
  id: number;
  name: string;
  group: string;
  status: 'PRESENT' | 'HOME';
  checkInTime?: string;
  checkOutTime?: string;
  pickupStatus?: 'PENDING' | 'APPROVED' | null;
  pickupPerson?: string;
}

export interface ApprovedPerson {
  id: number;
  childId: number;
  name: string;
  relation: string;
  phone: string;
  status: 'APPROVED' | 'PENDING';
  approvedDate?: string;
  blocked: boolean;
}

export interface Incident {
  id: number;
  childId: number;
  type: 'INJURY' | 'ILLNESS' | 'INFO' | 'EMERGENCY';
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  actionTaken?: string;
  notifiedParents: boolean;
  reportedAt: string;
}

export interface PickupLog {
  id: number;
  childId: number;
  pickedUpBy: string;
  pickedUpAt: string;
  checkedOutTime: string;
  verifiedBy: string;
}

export interface DailyInfo {
  id: number;
  date: string;
  type: 'MENU' | 'ACTIVITY' | 'ANNOUNCEMENT';
  title: string;
  description: string;
  targetGroup?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'PARENT' | 'STAFF' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: 'PARENT' | 'STAFF' | 'ADMIN';
  userId: number;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Generic fetch wrapper with auth
const apiFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      window.location.href = '/';
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response;
};

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setAuthToken(data.token);
    return data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    setAuthToken(data.token);
    return data;
  },

  logout: (): void => {
    removeAuthToken();
  },
};

// Children API
export const childrenApi = {
  getAll: async (): Promise<Child[]> => {
    const response = await apiFetch('/children');
    return response.json();
  },

  getById: async (id: number): Promise<Child> => {
    const response = await apiFetch(`/children/${id}`);
    return response.json();
  },

  create: async (child: Partial<Child>): Promise<Child> => {
    const response = await apiFetch('/children', {
      method: 'POST',
      body: JSON.stringify(child),
    });
    return response.json();
  },

  update: async (id: number, child: Partial<Child>): Promise<Child> => {
    const response = await apiFetch(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(child),
    });
    return response.json();
  },

  checkIn: async (id: number): Promise<Child> => {
    const response = await apiFetch(`/children/${id}/check-in`, {
      method: 'PATCH',
    });
    return response.json();
  },

  checkOut: async (id: number): Promise<Child> => {
    const response = await apiFetch(`/children/${id}/check-out`, {
      method: 'PATCH',
    });
    return response.json();
  },
};

// Export default API object
export const api = {
  auth: authApi,
  children: childrenApi,
};

