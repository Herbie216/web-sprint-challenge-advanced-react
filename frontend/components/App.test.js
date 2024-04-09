import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import AppFunctional from './AppFunctional';
import AppClass from './AppClass';

describe('App Components Tests', () => {
  describe('AppFunctional Component Tests', () => {
    test('renders heading with correct coordinates', () => {
      render(<AppFunctional />);
      const coordinatesHeading = screen.getByText('Coordinates (2, 2)');
      expect(coordinatesHeading).toBeInTheDocument();
    });

    test('renders "You moved 0 times" initially', () => {
      render(<AppFunctional />);
      const stepsInfo = screen.getByText('You moved 0 times');
      expect(stepsInfo).toBeInTheDocument();
    });

    test('typing in the input changes the email value', () => {
      render(<AppFunctional />);
      const emailInput = screen.getByPlaceholderText('type email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput).toHaveValue('test@example.com');
    });

    test('buttons work as intended', () => {
      render(<AppFunctional />);
      const leftButton = screen.getByText('LEFT');
      const upButton = screen.getByText('UP');
      const rightButton = screen.getByText('RIGHT');
      const downButton = screen.getByText('DOWN');
      const resetButton = screen.getByText('reset');
  
      fireEvent.click(upButton);
      fireEvent.click(upButton);
      expect(screen.getByText("You can't go up")).toBeInTheDocument();
  
      fireEvent.click(leftButton);
      fireEvent.click(leftButton);
      expect(screen.getByText("You can't go left")).toBeInTheDocument();
  
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      expect(screen.getByText("You can't go right")).toBeInTheDocument();
  
      fireEvent.click(downButton);
      fireEvent.click(downButton);
      fireEvent.click(downButton);
      expect(screen.getByText("You can't go down")).toBeInTheDocument();
  
      fireEvent.click(resetButton);
      expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
    });
  });

  describe('AppClass Component Tests', () => {
    test('renders heading with correct coordinates', () => {
      render(<AppClass />);
      const coordinatesHeading = screen.getByText('Coordinates (2, 2)');
      expect(coordinatesHeading).toBeInTheDocument();
    });
  
    test('renders "You moved 0 times" initially', () => {
      render(<AppClass />);
      const stepsInfo = screen.getByText('You moved 0 times');
      expect(stepsInfo).toBeInTheDocument();
    });
  
    test('typing in the input changes the email value', () => {
      render(<AppClass />);
      const emailInput = screen.getByPlaceholderText('type email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput).toHaveValue('test@example.com');
    });
  
    test('buttons work as intended', () => {
      render(<AppClass />);
      const leftButton = screen.getByText('LEFT');
      const upButton = screen.getByText('UP');
      const rightButton = screen.getByText('RIGHT');
      const downButton = screen.getByText('DOWN');
      const resetButton = screen.getByText('reset');
  
      fireEvent.click(upButton);
      fireEvent.click(upButton);
      expect(screen.getByText("You can't go up")).toBeInTheDocument();
  
      fireEvent.click(leftButton);
      fireEvent.click(leftButton);
      expect(screen.getByText("You can't go left")).toBeInTheDocument();
  
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      expect(screen.getByText("You can't go right")).toBeInTheDocument();
  
      fireEvent.click(downButton);
      fireEvent.click(downButton);
      fireEvent.click(downButton);
      expect(screen.getByText("You can't go down")).toBeInTheDocument();
  
      fireEvent.click(resetButton);
      expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
    });
  });
});

