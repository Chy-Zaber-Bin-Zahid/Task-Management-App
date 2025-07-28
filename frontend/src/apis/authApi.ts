import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth';
import axiosInstance from './axiosInstance';

// Login user
export async function login(
  payload: LoginPayload
): Promise<AuthResponse> {
  try {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Register new user
export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  try {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}