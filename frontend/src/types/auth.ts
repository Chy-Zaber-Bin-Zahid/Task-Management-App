export type LoginPayload = {
  email: string;
  password: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
}

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}