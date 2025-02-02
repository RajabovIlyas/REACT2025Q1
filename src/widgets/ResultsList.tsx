import { FC } from 'react';
import { SearchResult } from '../app/types';

interface ResultsListProps {
    results: SearchResult[];
}

const ResultsList: FC<ResultsListProps> = ({ results }) => {
    if (results.length === 0) {
        return <p className="text-gray-600">No results found</p>;
    }

    return (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b dark:border-gray-500">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {item.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {item.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResultsList;
