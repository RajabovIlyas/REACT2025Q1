/// <reference types="vite/client" />
/// <reference types="vitest" />
import '@testing-library/jest-dom';

declare global {
    namespace Vi {
        interface Matchers<T> extends jest.Matchers<T> {}
    }
}
