import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  SEARCH_BY_NAME,
  APPLY_FILTERS,
  POST_PRODUCT,
  ADD_TO_CAR,
  REMOVE_ONE_FROM_CAR,
  CLEAR_CART,
  REMOVE_ALL_CAR,
  ADD_ONE_CANT_CART,
  REGISTER,
  LOGIN,
  LOGOUT,

} from "./actionTypes";

const url = `http://localhost:3001`;

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/public/product`); //All products
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Traer el producto buscando por nombre
export function searchProductsByName(name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/product?name=${name}`);
      console.log(res);
      return dispatch({
        type: SEARCH_BY_NAME,
        searchName: name,
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  };
}

export function applyFilters(filterByTypes) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: APPLY_FILTERS,
        payload: {
          filterByTypes: filterByTypes,
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function postProduct(product, id) {
  console.log(id);
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/admin/product/${id}`, product);
      console.log(res.data);
      return dispatch({
        type: POST_PRODUCT,
        payload: res.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function register(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/public/register`,userData);
    
      return dispatch({
        type: REGISTER,
        payload: res.data, 
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

//se le pasa un id al loguearse
export const login = (id) => ({
  type: LOGIN,
  payload: id,
});
//salir sesion
export const logout = () => ({
  type: LOGOUT,
});
//AGREGAR UN PRODUCTO AL CARRITO
export const addToCar = (id) => ({
  type: ADD_TO_CAR,
  payload: id
})

//DISMINUIR LA CANTIDAD DE PRODUCTO EN EL CARRITO DE UNO EN UNO
export const delFromCar = (id, all = false) => ({
  type: REMOVE_ONE_FROM_CAR, payload: id 
});

//AGREGAR LA CANTIDAD DE PRODUCTO EN EL CARRITO DE UNO EN UNO
export const addCantProdCart = (id)=>({
  type: ADD_ONE_CANT_CART,
  payload:id

})
//ELIMINAR TODOS LOS PRODUCTOS DE UN MISMO TIPOS
export const delAllProductCart = (id, all = false) => ({
  type: REMOVE_ALL_CAR,
  payload: id
})
//LIMPIAR TODO EL CARRITO
export const clearCart = () => ({
  type: CLEAR_CART,
})