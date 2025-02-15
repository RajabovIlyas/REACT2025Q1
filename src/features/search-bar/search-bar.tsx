import { FC } from 'react';
import { useSearchBar } from './search-bar.hook.ts';
import Button from '../../shared/ui/button.tsx';

type SearchBarProps = {
    onSearch: (query: string) => Promise<void>;
};

const SearchBar: FC<SearchBarProps> = (props) => {
    const { query, handleSearch, handleInputChange } = useSearchBar(props);

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter search term..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default SearchBar;
