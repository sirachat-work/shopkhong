import { api } from '@/lib/axios';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  // ยิงสมัครสมาชิก
  register: async (data: RegisterPayload) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // ยิงเข้าสู่ระบบ
  login: async (data: LoginPayload) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};