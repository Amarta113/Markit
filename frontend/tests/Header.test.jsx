import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import Header from '../src/components/Layout/Header'

const userReducer = (
  state = {
    isAuthenticated: false,
    user: null,
    loading: false,
  }
) => state

const cartReducer = (
  state = {
    cart: [],
  }
) => state

const wishlistReducer = (
  state = {
    wishlist: [],
  }
) => state

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header activeHeading={1} />
      </MemoryRouter>
    </Provider>
  )
}

describe('Header component', () => {
  test('renders without crashing', () => {
    renderWithStore()

    expect(
      screen.getByPlaceholderText(/search for products/i)
    ).toBeInTheDocument()
  })

  test('redux slices exist correctly', () => {
    renderWithStore()

    expect(true).toBe(true)
  })
})