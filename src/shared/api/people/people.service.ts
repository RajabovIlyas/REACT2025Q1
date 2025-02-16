import { PeopleListResponse } from './people.types.ts';
import { fetcher } from '../index.ts';
import { People } from '../../../entities/people';

export const peopleListQuery = async (
    searchQuery: string,
    page?: string | null,
) => {
    return (
        await fetcher.get<PeopleListResponse>('/people', {
            params: { search: searchQuery, page },
        })
    ).data;
};

export const peopleQuery = async (id: string) => {
    return (await fetcher.get<People>(`/people/${id}`)).data;
};
