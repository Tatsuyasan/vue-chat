import axios from 'axios';
import { useJwt } from '@/hooks/useJwt';
const { jwt } = useJwt();

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  responseType: 'json'
});

http.interceptors.request.use((request) => {
  if (!jwt.value || !request.headers) return request;

  request.headers.Authorization = 'Bearer ' + jwt.value;

  return request;
});
