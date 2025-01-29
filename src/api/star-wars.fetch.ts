import axios from 'axios';
import { StarWarsResponse } from '../app/types';

const API_URL = 'https://swapi.dev/api/people';

export const fetchStarWars = async (searchQuery: string) => {
    return axios.get<StarWarsResponse>(API_URL, {
        params: { search: searchQuery },
    });
};
