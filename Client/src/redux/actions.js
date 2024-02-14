import axios from "axios";
import { 
  GET_ALL_PRODUCTS, 
  SEARCH_BY_NAME,
  APPLY_FILTERS,
  POST_PRODUCT,
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
  export function searchProductsByName(name){
    return async function(dispatch){
      try{
        const res = await axios.get(`${url}/public/product?name=${name}`);
        console.log(res);
        return dispatch({
          type: SEARCH_BY_NAME,
          searchName: name,
          payload: res.data,
        })
      } catch (error){
        console.log(error.message)
      }
    };
  }

  export function applyFilters(filterByTypes){
    return async function (dispatch){
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

export function postProduct(product, id){
  console.log(id);
  return async function(dispatch){
  try {
    const res = await axios.post(`${url}/admin/product/admin`, product);
    console.log(res.data);
    return dispatch ({
        type: POST_PRODUCT,
        payload: res.data
       })
  } catch (error) {
    console.log(error.message)
  }
 }
}