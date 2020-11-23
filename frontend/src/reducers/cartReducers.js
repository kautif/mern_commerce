import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const itemsInCart = state.cartItems.find((x) => x.product === item.product);

            if (itemsInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                        x.product === itemsInCart.product ? item : x
                    )
                }; 
            } else {
                return {...state, cartItems: [...state.cartItems, item]};
            }
        default:
            return state;
    }
}