import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';
import {Home} from "./views/Home/Home";

test.skip('Page title', () => {
  render(<App />);
  const linkElement = screen.getByText("Django");
  expect(linkElement).toBeInTheDocument();
});
