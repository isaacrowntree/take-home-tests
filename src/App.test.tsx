import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders at least one cell', () => {
  const { getByTestId } = render(<App />);
  const cellElement = getByTestId('00');
  expect(cellElement).toBeInTheDocument();
});
