import { PeopleSearchResult } from '../people';

export type SelectedItems = {
    [key: string]: PeopleSearchResult | null | undefined;
};
