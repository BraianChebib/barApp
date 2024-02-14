import {
    APPLY_FILTERS,
    GET_ALL_PRODUCTS,
    SEARCH_BY_NAME,
    POST_PRODUCT
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
        case APPLY_FILTERS:
            var filteringProducts = [...state.allProducts];
            if(action.payload.filterByTypes.length >0){
                filteringProducts = filteringProducts.filter((product) =>
                action.payload.filterByTypes.includes(product.type)
                )
            }
            return{
                ...state,
                properties: filteringProducts,
            }

        case POST_PRODUCT:
           return{
            ...state,
            products: [...state.products, action.payload],
            allProducts: [...state.allProducts, action.payload],
           }


        default:
            return state;
    }
};

export default rootReducer;
