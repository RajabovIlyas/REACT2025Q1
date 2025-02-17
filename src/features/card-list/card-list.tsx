import { FC } from 'react';
import { useCardList } from './card-list.hook.ts';
import { PeopleSearchResult } from '../../entities/people';
import CardListWidgets from '../../widgets/card-list/card-list.tsx';

type CardListProps = {
    results: PeopleSearchResult[];
};

const CardList: FC<CardListProps> = ({ results }) => {
    const { clickPeople, closeDetails, selectedItems } = useCardList();
    return (
        <CardListWidgets
            clickPeople={clickPeople}
            results={results}
            closeDetails={closeDetails}
            selectedItems={selectedItems}
        />
    );
};

export default CardList;
