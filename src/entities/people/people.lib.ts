import { PeopleListResponse, PeopleSearchResult } from './people.type.ts';

export const transformUrlToId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

export const transformPeoplesResToPeoplesResult = (
    response: PeopleListResponse,
): PeopleSearchResult[] => {
    return response.results.map((result) => ({
        id: transformUrlToId(result.url),
        title: result.name,
        description: `height: ${result.height}, mass: ${result.mass}, gender: ${result.gender}, hair color: ${result.hair_color}`,
    }));
};
