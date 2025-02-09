import { FC } from 'react';

type PaginationProps = {
    prev: string | null;
    next: string | null;
    loadPage: (page: string) => void;
    loading: boolean;
};

const Pagination: FC<PaginationProps> = ({ prev, next, loadPage, loading }) => {
    const onClick = (page: string | null) => () => {
        if (!page) {
            return;
        }
        loadPage(page);
    };

    return (
        <div className="flex justify-center mt-4 gap-4">
            <button
                data-testid="pagination-prev"
                disabled={!prev || loading}
                onClick={onClick(prev)}
                className="py-2 px-4 text-white bg-gray-600 rounded focus:outline-none disabled:opacity-50 hover:bg-gray-700 hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:hover:bg-gray-600 transition-colors">
                Previous
            </button>
            <button
                data-testid="pagination-next"
                disabled={!next || loading}
                onClick={onClick(next)}
                className="py-2 px-4 text-white bg-gray-600 rounded focus:outline-none disabled:opacity-50 hover:bg-gray-700 hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:hover:bg-gray-600 transition-colors">
                Next
            </button>
        </div>
    );
};

export default Pagination;
