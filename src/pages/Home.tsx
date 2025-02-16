import { Component } from 'react';
import { SearchResult } from '../app/types';
import SearchBar from '../features/SearchBar.tsx';
import ResultsList from '../widgets/ResultsList.tsx';
import { fetchStarWars } from '../api/star-wars.fetch.ts';

interface HomeProps {
    error?: Error;
}

interface HomeState {
    results: SearchResult[];
    loading: boolean;
    error: Error | null;
}

class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            results: [],
            loading: false,
            error: props.error || null,
        };
    }

    async fetchResults(searchQuery: string) {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetchStarWars(searchQuery);
            this.setState({
                results: response.data.results.map((result) => ({
                    id: result.url,
                    title: result.name,
                    description: `height: ${result.height}, mass: ${result.mass}, gender: ${result.gender}, hair color: ${result.hair_color}`,
                })),
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                this.setState({ error: err });
            }
            console.error(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    triggerError() {
        try {
            throw new Error('Test error');
        } catch (err: unknown) {
            if (err instanceof Error) {
                this.setState({ error: err });
            }
        }
    }

    render() {
        const { loading, results, error } = this.state;
        if (error) {
            throw new Error('something went wrong');
        }
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-2xl mx-auto mb-6">
                    <SearchBar onSearch={this.fetchResults.bind(this)} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {loading ? (
                        <div className="text-center text-gray-600">
                            Loading...
                        </div>
                    ) : (
                        <ResultsList results={results} />
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        className="r-0 mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                        onClick={this.triggerError.bind(this)}>
                        Trigger Error
                    </button>
                </div>
            </div>
        );
    }
}

export default Home;
