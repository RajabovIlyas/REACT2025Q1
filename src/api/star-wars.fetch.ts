import axios from 'axios';
import { StarWarsResponse } from '../app/types';
import { API_URL } from './constants.ts';

export const fetchStarWars = async (searchQuery: string) => {
    return axios.get<StarWarsResponse>(API_URL, {
        params: { search: searchQuery },
    });
};
