import { FC } from 'react';
import { PeopleSearchResult } from '../../entities/people';
import CardItem from './card-item.tsx';
import { SelectedItems } from '../../entities/selected-items';

type CardListProps = {
    results: PeopleSearchResult[];
    clickPeople: (id: string) => void;
    closeDetails: () => void;
    selectedItems: SelectedItems;
};

const CardList: FC<CardListProps> = ({
    results,
    clickPeople,
    closeDetails,
    selectedItems,
}) => {
    if (results.length === 0) {
        return (
            <div className="flex-1" onClick={closeDetails}>
                <div className="flex-1 flex justify-center items-center h-full">
                    <p
                        data-testid="no-cards-message"
                        className="text-gray-600 text-center">
                        No results found
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="grow overflow-x-auto border border-gray-500 rounded-2xl"
            onClick={closeDetails}>
            <div className="min-w-full p-4">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className=""></th>
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
                                <CardItem
                                    key={item.id}
                                    {...item}
                                    clickPeople={clickPeople}
                                    selectedItems={selectedItems}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CardList;
