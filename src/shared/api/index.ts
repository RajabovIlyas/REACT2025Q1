import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const fetcher = axios.create({
    baseURL: API_URL,
});
