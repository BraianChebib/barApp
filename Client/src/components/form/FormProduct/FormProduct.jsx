import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import {postProduct} from '../../../redux/actions';

export default function ProductCreate (){
    const dispatch =  useDispatch ();
     const {id} = useParams();
     const tipos = ["Bebidas", "Platos", "Postres"];
    const [input, setInput] = useState({
        name: "",
        precio: "",
        descripcion: "",
        type: "",
        image: "",
        UserId: id,
      });
  
    const handlerSubmit = (e)=>{
    e.preventDefault();
    console.log("soy input", input);
    dispatch(postProduct(input, id));
    alert("Producto creado con éxito! Se te redirigirá al inicio...");
    setInput({
        name: "",
        precio: "",
        descripcion: "",
        type: "",
        image: "",
        UserId:"",
    });
    }

    const handlerChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value, //al 'name' de los input se los modifico con los 'value' que pase el usuario
          });
    }

    const handleSelect = (e) => {
      console.log(e.target.value);
      setInput({
          ...input,
          type:  e.target.value
    })
    }


    return(
        <>
            <div className="formProduct">
               <div className="buttonBack">
                <Link to="/">
                   <button>← Back</button>
                </Link>
               </div>

               <div className="InputForm">
                <h1>creacion de Nuevo Producto</h1>
                  <form onSubmit={(e)=> handlerSubmit(e)}>
                   <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={input.name} onChange={(e)=> handlerChange(e)}></input>
                    <br/>
                    <label>Precio: </label>
                    <input type="number" name="precio" value={input.precio} onChange={(e)=> handlerChange(e)}></input>
                    <br/>
                    <label>Descripcion: </label>
                    <input type="text" name="descripcion" value={input.descripcion} onChange={(e)=> handlerChange(e)}></input>
                    <br/>
                    <label>Tipo: </label>
                    <select name="type" onChange={(e) => handleSelect(e)}>
                                {tipos.map(ty => (
                                    <option  value={ty}>{ty}</option>
                                ))}
                     </select>
                     <br/>
                    <label>Image: </label>
                    <input type="text" name="image" value={input.image} onChange={(e)=> handlerChange(e)}></input>
                    <br/>
                    <button
                  type="create">
                  Crear Producto
                </button>
                   </div>
                  </form>
               </div>
            </div>
        </>
    )
}
