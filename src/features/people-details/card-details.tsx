import { FC } from 'react';
import { useCardDetails } from './card-details.hook.ts';
import CardDetailsUI from '../../widgets/card-details.tsx';
import Loader from '../../shared/ui/loader.tsx';

const CardDetails: FC = () => {
    const { error, person, loading, closePersonDetails } = useCardDetails();

    if (error) {
        throw error;
    }

    return (
        <div
            data-testid="card-details"
            className="grow overflow-x-auto border-gray-500 border rounded-2xl">
            <div className="min-h-full min-w-48 flex flex-col p-4">
                <div className="flex justify-end">
                    <button
                        data-testid="card-details-close-btn"
                        onClick={closePersonDetails}
                        className="mb-4 bg-gray-500 text-white p-1 rounded-md hover:bg-gray-600 transition-colors">
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {loading ? <Loader /> : person && <CardDetailsUI {...person} />}
            </div>
        </div>
    );
};

export default CardDetails;
