import { PeopleSearchResult } from '../../entities/people';
import { FC } from 'react';

type CardItemProps = PeopleSearchResult & {
    clickPeople: (id: string) => void;
};

const CardItem: FC<CardItemProps> = ({
    id,
    clickPeople,
    title,
    description,
}) => {
    const onClickItem = () => {
        clickPeople(id);
    };

    return (
        <tr
            data-testid={`result-card-${id}`}
            onClick={onClickItem}
            className="border-b dark:border-gray-500 hover:bg-gray-100  hover:cursor-pointer">
            <td
                data-testid="card-title"
                className="whitespace-nowrap px-6 py-4">
                {title}
            </td>
            <td
                data-testid="card-description"
                className="whitespace-nowrap px-6 py-4">
                {description}
            </td>
        </tr>
    );
};

export default CardItem;
