import 'react';
import { DOMAttributes } from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        'data-testid'?: string;
    }
}
