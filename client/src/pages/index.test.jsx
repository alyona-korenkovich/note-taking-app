import Index from './index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Render main page', () => {
  it('renders the main page', () => {
    // ARRANGE
    render(<Index />);

    // ACT

    // ASSERT
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('linkToLogin')).toBeInTheDocument();
    expect(screen.getByTestId('linkToSignup')).toBeInTheDocument();
    expect(screen.getByTestId('mainPageContents')).toBeInTheDocument();
    expect(screen.getByTestId('mainPageHeading')).toBeInTheDocument();
    expect(screen.getByTestId('mainPageDescription')).toBeInTheDocument();
    expect(screen.getByTestId('mainPageButton')).toBeInTheDocument();
    expect(screen.getByTestId('mainPageImage')).toBeInTheDocument();
  });

  test('redirect to Login page', async () => {
    // ARRANGE
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Index />
      </RouterContext.Provider>,
    );

    const loginButton = screen.getByTestId('linkToLogin');

    // ACT
    fireEvent.click(loginButton);

    // ASSERT
    expect(router.push).toHaveBeenCalledWith('/login', '/login', expect.anything());
  });

  test('redirect to Signup page', async () => {
    // ARRANGE
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Index />
      </RouterContext.Provider>,
    );

    const signUpButton = screen.getByTestId('linkToSignup');

    // ACT
    fireEvent.click(signUpButton);

    // ASSERT
    expect(router.push).toHaveBeenCalledWith('/signup', '/signup', expect.anything());
  });
});
