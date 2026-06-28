import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from "./reducer/user.js";
import { cartReducer } from './reducer/cartReducer.js';
import { wishlistReducer } from './reducer/wishlistReducer.js';
import { sellerReducer } from './reducer/sellerReducer.js';
import { productReducer } from './reducer/productReducer.js';


const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    seller: sellerReducer,
    wishlist: wishlistReducer,
    products: productReducer
  },
}); 

export default store;