import {
    GET_ALL_PRODUCTS
  } from "./actionTypes";

const initialState = {
    products: [],
    allProducts: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS:
            return {
              ...state,
              products: action.payload,
              allProducts: action.payload,
            //   searchTerm: "",
            };

        default:
            return state;
    }
};

export default rootReducer;
