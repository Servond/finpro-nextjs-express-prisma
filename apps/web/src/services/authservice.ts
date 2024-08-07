// src/services/authService.ts
import axios from 'axios';

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data.token; // Assuming the token is returned in response.data.token
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};
