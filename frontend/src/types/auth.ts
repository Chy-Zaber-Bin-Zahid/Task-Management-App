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
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}