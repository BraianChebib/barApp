import {
    GET_ALL_PRODUCTS,
    SEARCH_BY_NAME,
  } from "./actionTypes";

const initialState = {
    products: [],
    allProducts: [],
    searchTerm: "",
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
        case SEARCH_BY_NAME:
            return{
                ...state,
                products: action.payload,
                allProducts: action.payload,
                searchTerm: "",
            };

        default:
            return state;
    }
};

export default rootReducer;
