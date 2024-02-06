import axios from "axios";
import { 
  GET_ALL_PRODUCTS, 
  SEARCH_BY_NAME,
} from "./actionTypes";

const url = `http://localhost:3001`;

export function getAllProducts() {
    return async function (dispatch) {
      try {
        const res = await axios.get(`http://localhost:3001/public/product`); //All products
        console.log("holaaa")
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