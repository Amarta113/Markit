import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from "./reducer/user.js";
import { cartReducer } from './reducer/cartReducer.js';
import { wishlistReducer } from './reducer/wishlistReducer.js';
import { sellerReducer } from './reducer/sellerReducer.js';


const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    seller: sellerReducer,
    wishlist: wishlistReducer
  },
}); 

export default store;