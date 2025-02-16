import { FC, MouseEvent, ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            {children}
        </button>
    );
};

export default Button;
