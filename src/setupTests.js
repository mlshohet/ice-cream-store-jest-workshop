// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server.js';

// Establish API mocks before tests
beforeAll(() => server.listen());

//Reset request handlers that are added during tests
afterEach(() => server.resetHandlers());

// Clean up after tests
afterAll(() => server.close());
