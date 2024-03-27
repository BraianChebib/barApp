import {
    APPLY_FILTERS,
    GET_ALL_PRODUCTS,
    SEARCH_BY_NAME,
    POST_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    ADD_TO_CAR,
    REMOVE_ALL_FROM_CAR,
    REMOVE_ONE_FROM_CAR,
    CLEAR_CART,
    REMOVE_ALL_CAR,
    ADD_ONE_CANT_CART,
    REGISTER,
    LOGIN,
    LOGOUT,
    GET_USER,
} from "./actionTypes";

const initialState = {
    products: [],
    allProducts: [],
    searchTerm: "",
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    user: {},
    loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
    id: '',
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
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload,
                searchTerm: "",
            };
        case APPLY_FILTERS:
            var filteringProducts = [...state.allProducts];
            if (action.payload.filterByTypes.length > 0) {
                filteringProducts = filteringProducts.filter((product) =>
                    action.payload.filterByTypes.includes(product.type)
                )
            }
            return {
                ...state,
                properties: filteringProducts,
            }

        case POST_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                allProducts: [...state.allProducts, action.payload],
            }

        case UPDATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                allProducts: [...state.allProducts, action.payload],
            }

        case DELETE_PRODUCT:
            // Filtrar los productos y los productos totales para excluir el producto eliminado
            const updatedProducts = state.products.filter(product => product.id !== action.payload.id);
            const updatedAllProducts = state.allProducts.filter(product => product.id !== action.payload.id);
            return {
                ...state,
                products: updatedProducts,
                allProducts: updatedAllProducts,
            };

        case ADD_TO_CAR:
            const newItem = state.products.find(product => product.id === action.payload);
            let cartArray = [];

            // Obtener el carrito del localStorage si existe
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                try {
                    cartArray = JSON.parse(storedCart);
                    if (!Array.isArray(cartArray)) {
                        cartArray = []; // Si el valor en localStorage no es un array válido, inicializar como un array vacío
                    }
                } catch (error) {
                    console.error('Error parsing cart from localStorage:', error);
                    cartArray = []; // Si hay un error al analizar el JSON, inicializar como un array vacío
                }
            }

            const itemInCart = cartArray.find(item => item.id === newItem.id);

            const updatedCart = itemInCart
                ? cartArray.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...cartArray, { ...newItem, quantity: 1 }];

            // Actualizar localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
            };

        case REMOVE_ALL_CAR:
            const removeCart = state.cart.filter((item) => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(removeCart));

            return {
                ...state,
                cart: removeCart
            };

        case REMOVE_ALL_FROM_CAR:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload)
            }

        case REMOVE_ONE_FROM_CAR:
            const itemToDelete = state.cart.find((item) => item.id === action.payload);
            const updatedCartAfterRemoval = itemToDelete.quantity > 1
                ? state.cart.map((item) =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                : state.cart

            // Actualizar localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCartAfterRemoval));

            return {
                ...state,
                cart: updatedCartAfterRemoval,
            };

        case ADD_ONE_CANT_CART:
            const updatedCartAfterAddition = state.cart.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            // Actualizar localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCartAfterAddition));

            return {
                ...state,
                cart: updatedCartAfterAddition,
            };
        case CLEAR_CART:
            return initialState;

        case REGISTER:
            return {
                ...state
            };
        case LOGIN:
            localStorage.setItem("loggedIn", action.payload);
            return {
                ...state,
                loggedIn: action.payload,
                id: action.payload
            };

        case LOGOUT:
            localStorage.setItem("loggedIn", "");
            return {
                ...state,
                loggedIn: false,
                user: {},
            };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };


        default:
            return state;
    }
};

export default rootReducer;