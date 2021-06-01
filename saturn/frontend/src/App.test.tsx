import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';
import {Home} from "./views/Home/Home";

test.skip('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText("Django Saturn Admin");
  expect(linkElement).toBeInTheDocument();
});
