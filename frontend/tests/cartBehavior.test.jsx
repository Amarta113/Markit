import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import ProductDetails from '../src/components/UserComponents/ProductDetails.jsx'
import { cartReducer } from '../redux/reducer/cartReducer.js'
import { wishlistReducer } from '../redux/reducer/wishlistReducer.js'
import { productReducer } from '../redux/reducer/productReducer.js'

const product = {
  _id: 'product-1',
  name: 'Test Product',
  description: 'A product for cart tests',
  stock: 10,
  discountPrice: 99,
  originalPrice: 120,
  images: [{ url: 'https://example.com/image.jpg' }],
  shop: {
    _id: 'shop-1',
    name: 'Sample Shop',
    avatar: { url: 'https://example.com/avatar.jpg' },
  },
  reviews: [],
}

const createStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      products: productReducer,
      user: (state = { isAuthenticated: false, user: null }) => state,
      seller: (state = {}) => state,
    },
    preloadedState: {
      cart: { cart: [] },
      wishlist: { wishlist: [] },
      products: { isLoading: false, products: [] },
      user: { isAuthenticated: false, user: null },
      seller: {},
    },
  })

describe('cart add-to-cart flow', () => {
  test('adds a full product object to cart when clicking Add to cart', () => {
    const store = createStore()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDetails data={product} />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText(/add to cart/i))

    expect(store.getState().cart.cart).toHaveLength(1)
    expect(store.getState().cart.cart[0]).toMatchObject({
      _id: 'product-1',
      qty: 1,
      name: 'Test Product',
    })
  })
})
