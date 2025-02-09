import { People } from '../entities/people';
import { FC } from 'react';

type ItemDetailsProps = People;

const CardDetails: FC<ItemDetailsProps> = ({
    name,
    birth_year,
    mass,
    hair_color,
    skin_color,
}) => {
    return (
        <div data-testid="card-details-result" className="min-w-24">
            <h2 data-testid="card-details-name">
                <strong>name:</strong> {name}
            </h2>
            <p data-testid="card-details-birth-year">
                <strong>birth year:</strong> {birth_year}
            </p>
            <p data-testid="card-details-massa">
                <strong>massa:</strong> {mass}
            </p>
            <p data-testid="card-details-hair-color">
                <strong>hair color:</strong> {hair_color}
            </p>
            <p data-testid="card-details-skin-color">
                <strong>skin color:</strong> {skin_color}
            </p>
        </div>
    );
};

export default CardDetails;
