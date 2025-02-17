import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { People, PeopleListResponse } from '../../../entities/people';
import { API_URL } from '../../../entities';

type GetPeopleQueryArgs = {
    search: string;
    page?: string | null;
};

type GetPeopleByIdQueryArgs = {
    id?: string;
};

export const peopleApi = createApi({
    reducerPath: 'people-api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (build) => {
        return {
            getPeople: build.query<PeopleListResponse, GetPeopleQueryArgs>({
                query: (arg) => ({
                    url: '/people',
                    method: 'GET',
                    params: arg,
                }),
            }),
            getPeopleById: build.query<People, GetPeopleByIdQueryArgs>({
                query: ({ id }) => ({
                    url: `/people/${id}`,
                    method: 'GET',
                }),
            }),
        };
    },
});

export const useGetPeopleQuery = peopleApi.useGetPeopleQuery;
export const useGetPeopleByIdQuery = peopleApi.useGetPeopleByIdQuery;
