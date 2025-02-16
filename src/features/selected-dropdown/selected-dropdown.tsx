import { FC } from 'react';
import Button from '../../shared/ui/button.tsx';
import { useSelectedDropdown } from './selected-dropdown.hook.ts';

const SelectedDropdown: FC = () => {
    const { filteredSelectedItems, onResetSelected, onDownload } =
        useSelectedDropdown();

    if (!filteredSelectedItems.length) {
        return null;
    }

    return (
        <div className="bottom-7 left-7 fixed border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl shadow-md p-4">
            <p className="pb-4">
                {filteredSelectedItems.length} items are selected
            </p>
            <div className="flex gap-4">
                <Button onClick={onResetSelected}>Unselect all</Button>
                <Button onClick={onDownload}>Download</Button>
            </div>
        </div>
    );
};

export default SelectedDropdown;
