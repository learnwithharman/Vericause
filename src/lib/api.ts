// Central API client for the VeriCause backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('vc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = { ...getAuthHeaders(), ...(options.headers || {}) } as Record<string, string>;
  
  // Only set Content-Type to JSON if body is not FormData
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data as T;
}

// --- Types ---
export interface Campaign {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  imageUrl?: string;
  category: string;
  status?: string; // Changed to optional
  transparencyScore: number;
  verificationDocUrl?: string;
  createdAt: string;
  verified: boolean;
  isDemo?: boolean;
  ngo: { organizationName: string; verificationStatus: string; contactInfo?: string; verificationDocUrl?: string };
  _count: { donations: number };
  impactUpdates?: ImpactUpdate[];
}

export interface ImpactUpdate {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  isDemo?: boolean;
  campaign: { title: string; category: string; ngo: { organizationName: string } };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  ngo?: { organizationName: string; verificationStatus: string; contactInfo?: string; verificationDocUrl?: string };
}

// --- Auth ---
export const auth = {
  register: (data: FormData | object) =>
    request<{ user: AuthUser; accessToken: string }>('/auth/register', { 
      method: 'POST', 
      body: data instanceof FormData ? data : JSON.stringify(data) 
    }),

  login: (email: string, password: string) =>
    request<{ user: AuthUser; accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  saveSession: (token: string, user: AuthUser) => {
    localStorage.setItem('vc_token', token);
    localStorage.setItem('vc_user', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('vc_token');
    localStorage.removeItem('vc_user');
  },

  currentUser: (): AuthUser | null => {
    const u = localStorage.getItem('vc_user');
    return u ? JSON.parse(u) : null;
  },

  isLoggedIn: () => !!localStorage.getItem('vc_token'),
};

// --- Campaigns ---
export const campaigns = {
  list: (params?: { category?: string; status?: string }) => {
    const qs = params ? '?' + new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString() : '';
    return request<Campaign[]>(`/campaigns${qs}`);
  },

  get: (id: string) => request<Campaign>(`/campaigns/${id}`),

  create: (data: FormData | object) =>
    request<Campaign>('/campaigns', { 
      method: 'POST', 
      body: data instanceof FormData ? data : JSON.stringify(data) 
    }),

  update: (id: string, data: Partial<Campaign>) =>
    request<Campaign>(`/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  addUpdate: (id: string, data: { title: string; description: string; imageUrl?: string }) =>
    request<ImpactUpdate>(`/campaigns/${id}/updates`, { method: 'POST', body: JSON.stringify(data) }),

  toggleStatus: (id: string) =>
    request<Campaign>(`/campaigns/${id}/toggle-status`, { method: 'PATCH' }),

  delete: (id: string) =>
    request<{ success: boolean }>(`/campaigns/${id}`, { method: 'DELETE' }),
};

// --- Donations ---
export const donations = {
  donate: (campaignId: string, amount: number) =>
    request<Donation>('/donations', { method: 'POST', body: JSON.stringify({ campaignId, amount }) }),

  myDonations: () => request<Donation[]>('/donations/user'),

  campaignDonations: (campaignId: string) => request<Donation[]>(`/donations/campaign/${campaignId}`),
};

// --- Admin ---
export interface NGO {
  id: string;
  organizationName: string;
  description: string;
  contactInfo?: string;
  verificationDocUrl?: string;
  verificationStatus: string;
  user: { name: string; email: string; createdAt: string };
  _count: { campaigns: number };
}

export const admin = {
  listNgos: () => request<NGO[]>('/admin/ngos'),
  verifyNgo: (id: string, status: 'VERIFIED' | 'REJECTED') => 
    request<NGO>(`/admin/ngos/${id}/verify`, { method: 'PUT', body: JSON.stringify({ status }) }),
  listCampaigns: () => request<Campaign[]>('/admin/campaigns'),
  approveCampaign: (id: string, status: 'APPROVED' | 'REJECTED') => 
    request<Campaign>(`/admin/campaigns/${id}/approve`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getStats: () => request<AdminStats>('/admin/stats'),
};

export interface AdminStats {
  users: number;
  campaigns: number;
  activeCampaigns: number;
  pendingCampaigns: number;
  verifiedNgos: number;
  totalRaised: number;
  donations: number;
}
