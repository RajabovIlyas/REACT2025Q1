import { PeopleSearchResult } from '../../entities/people';
import { FC } from 'react';
import Button from '../../shared/ui/button.tsx';
import { selectedItemsActions } from '../../shared/lib/store/slices/selected-items.slice.ts';
import { useAppDispatch } from '../../shared/lib/store/hooks/redux-types-hooks.ts';
import { SelectedItems } from '../../entities/selected-items';

const { selectedItem } = selectedItemsActions;

type CardItemProps = PeopleSearchResult & {
    clickPeople: (id: string) => void;
    selectedItems: SelectedItems;
};

const CardItem: FC<CardItemProps> = ({
    id,
    clickPeople,
    title,
    description,
    selectedItems,
}) => {
    const dispatch = useAppDispatch();
    const onClickItem = () => {
        clickPeople(id);
    };

    const onClickCheckbox = () => {
        dispatch(selectedItem(id));
    };

    return (
        <tr
            data-testid={`result-card-${id}`}
            className="border-b dark:border-gray-500 hover:bg-gray-100  hover:cursor-pointer">
            <td data-testid="card-checkbox" className="px-4 py-4">
                <input
                    type="checkbox"
                    className="z-10"
                    defaultChecked={!!selectedItems[id]}
                    onClick={onClickCheckbox}
                />
            </td>
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
            <td data-testid="card-details" className="">
                <Button onClick={onClickItem}>Details</Button>
            </td>
        </tr>
    );
};

export default CardItem;
