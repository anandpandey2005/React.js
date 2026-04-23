import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlices";
import productReducer from "./slices/productSlices";
import wishlistReducer from "./slices/wishlistSlices";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        wishlist: wishlistReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;