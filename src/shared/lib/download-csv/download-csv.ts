import { saveAs } from 'file-saver';
import { PeopleSearchResult } from '../../../entities/people';
import { API_URL } from '../../../entities';

export const downloadCSV = (selectedItems: PeopleSearchResult[]) => {
    const csvContent = [
        ['Name', 'Description', 'Details URL'],
        ...selectedItems.map((item) => [
            item.title,
            item.description.replace(/,/g, '.'),
            `${API_URL}/people/${item.id}`,
        ]),
    ]
        .map((item) => item.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
};
