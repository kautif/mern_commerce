import { ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_RESET, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";


export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            console.log("orderDetailsReducer: ", state);
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            console.log("orderDetailsReducer: ", state);
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            console.log("orderDetailsReducer: ", state);
            return {loading: false, error: action.payload};
        default:
            console.log("orderDetailsReducer: ", state);
            return state;
    }
}