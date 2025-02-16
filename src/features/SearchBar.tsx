import { ChangeEvent, Component } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => Promise<void>;
}

interface SearchBarState {
    query: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            query: '',
        };
    }

    componentDidMount() {
        const lastQuery = localStorage.getItem('lastSearchQuery') ?? '';
        this.setState({ query: lastQuery });
        this.props.onSearch(lastQuery);
    }

    handleSearch = () => {
        const query = this.state.query.trim();
        localStorage.setItem('lastSearchQuery', query);
        this.props.onSearch(query);
    };

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ query: event.target.value });
    }

    render() {
        return (
            <div className="flex gap-2">
                <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleInputChange.bind(this)}
                    placeholder="Enter search term..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={this.handleSearch.bind(this)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                    Search
                </button>
            </div>
        );
    }
}

export default SearchBar;
