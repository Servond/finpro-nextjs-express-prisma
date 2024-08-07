import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// (): AxiosInstance => {
//   // const token = getCookie('access-token') || '';
// return
//   axios.create({
//     baseURL: process.env.API_URL,
//     withCredentials: true,
//   });
// };

export default instance;

// headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
