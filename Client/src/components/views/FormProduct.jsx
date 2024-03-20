import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { postProduct } from '../../redux/actions';

export default function FormProduct() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tipos = ["Bebidas", "Platos", "Postres"];
    const [input, setInput] = useState({
        name: "",
        precio: "",
        descripcion: "",
        type: "",
        image: "",
        UserId: id,
    });

    const handlerSubmit = (e) => {
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
            UserId: "",
        });
    }

    const handlerChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value, //al 'name' de los input se los modifico con los 'value' que pase el usuario
        });
    }

    const handleSelect = (e) => {
        console.log(e.target.value);
        setInput({
            ...input,
            type: e.target.value
        })
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {/* <div className="buttonBack"> */}
                {/* <Link to="/">
                   <button>← Back</button>
                </Link> */}
                {/* </div> */}

                <div className="w-80 flex flex-col items-center justify-center">

                    <form onSubmit={(e) => handlerSubmit(e)} className="flex flex-col w-full p-10  items-center justify-center">
                        <h1 className="text-3xl mb-6">New Product</h1>
                        <div className="text-left flex flex-col w-full">
                            <label htmlFor="name" >Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900">
                            </input>

                            <label htmlFor="precio" className="mt-4">Precio: </label>
                            <input
                                type="number"
                                name="precio"
                                value={input.precio}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900">

                            </input>

                            <label htmlFor="descripcion" className="mt-4">Descripcion: </label>
                            <input
                                type="text"
                                name="descripcion"
                                value={input.descripcion}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900">

                            </input>

                            <label htmlFor="type" className="mt-4">Tipo: </label>
                            <select name="type"  onChange={(e) => handleSelect(e)} className="mt-1 border h-9 bg-gray-300 border-gray-900">
                                {tipos.map(ty => (
                                    <option className="w-4" value={ty}>{ty}</option>
                                ))}
                            </select>

                            <label htmlFor="image" className="mt-4">Image: </label>
                            <input type="text" name="image" value={input.image} onChange={(e) => handlerChange(e)}></input>

                            <button
                                type="create"
                                className="mt-8 border-2 border-gray-500 w-full h-10  text-black">
                                Crear Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
