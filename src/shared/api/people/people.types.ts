import { People } from '../../../entities/people';

export type PeopleListResponse = {
    count: number;
    next: null | string;
    previous: null | string;
    results: People[];
};
