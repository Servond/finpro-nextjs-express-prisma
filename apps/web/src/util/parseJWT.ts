export default function parseJWT(token: string) {
    try {
      if (!token) throw new Error('Missing token');
  
      const base64url = token.split('.')[1];
      const base64 = base64url.replace('-', '+').replace('_', '/');
  
      return JSON.parse(window.atob(base64));
    } catch (error) {
      throw error;
    }
  }