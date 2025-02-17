import { Pagination } from './pagination.type.ts';
import { PeopleListResponse } from '../people';

export const transformPeoplesResToPagination = (
    { next, previous }: PeopleListResponse,
    params = 'page',
): Pagination => {
    return {
        prev: previous && new URL(previous).searchParams.get(params),
        next: next && new URL(next).searchParams.get(params),
    };
};
