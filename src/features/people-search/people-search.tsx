import SearchBar from '../search-bar/search-bar.tsx';
import CardList from '../card-list/card-list.tsx';
import { usePeopleSearch } from './hooks';
import Loader from '../../shared/ui/loader.tsx';
import Pagination from '../pagination/pagination.tsx';
import { Outlet } from 'react-router';

const PeopleSearch = () => {
    const {
        loadPage,
        pagination,
        error,
        triggerError,
        results,
        fetchResults,
        loading,
    } = usePeopleSearch();
    if (error) {
        throw error;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto mb-6">
                <SearchBar onSearch={fetchResults} />
            </div>
            <div className="min-h-[calc(100vh-16rem)] flex items-stretch gap-3 bg-white shadow-md rounded-lg p-6">
                {loading ? (
                    <div className="flex-1">
                        <Loader />
                    </div>
                ) : (
                    <CardList results={results} />
                )}
                <Outlet />
            </div>
            <Pagination {...pagination} loading={loading} loadPage={loadPage} />
            <div className="flex justify-end">
                <button
                    className="r-0 mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    onClick={triggerError}>
                    Trigger Error
                </button>
            </div>
        </div>
    );
};

export default PeopleSearch;
