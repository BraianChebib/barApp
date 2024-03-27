import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { updateProduct, deleteProduct } from '../../redux/actions';

const UpdateProduct = () => {
    const { id } = useParams();
    const productos = useSelector(state => state.products);
    const product = productos.find(product => product.id === parseInt(id));
    const dispatch = useDispatch();

    console.log(product)
 
    
    const tipos = ["Bebidas", "Platos", "Postres"];

    // Inicializar el estado con los datos del producto
    const [input, setInput] = useState({
        name: product ? product.name : "",
        precio: product ? product.precio : "",
        descripcion: product ? product.descripcion : "",
        type: product && product.type ? product.type : "",
        image: product ? product.image : "",
        UserId: id,
    });

    // actualizo el estado cuando el producto cambia
    useEffect(() => {
        if (product) {
            setInput({
                name: product.name,
                precio: product.precio,
                descripcion: product.descripcion,
                type: product && product.type ? product.type : "",
                image: product.image,
                UserId: id,
            });
        }
    }, [product, id]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(input, id));
        alert("Producto modificado con éxito! Se te redirigirá al inicio...");
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
            [e.target.name]: e.target.value,
        });
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            type: e.target.value
        })
    }

    const handleDelete = () => {
        console.log(id)
        dispatch(deleteProduct(id));
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-80 flex flex-col items-center justify-center">
                    <form onSubmit={(e) => handlerSubmit(e)} className="flex flex-col w-full p-10  items-center justify-center">
                        <h1 className="text-3xl mb-6">Update Product</h1>
                        <div className="text-left flex flex-col w-full">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900 p-2">
                            </input>

                            <label htmlFor="precio" className="mt-4">Precio: </label>
                            <input
                                type="number"
                                name="precio"
                                value={input.precio}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900 p-2">
                            </input>

                            <label htmlFor="descripcion" className="mt-4">Descripcion: </label>
                            <input
                                type="text"
                                name="descripcion"
                                value={input.descripcion}
                                onChange={(e) => handlerChange(e)}
                                className="mt-1 border h-9 bg-gray-300 border-gray-900 p-2">
                            </input>

                            <label htmlFor="type" className="mt-4">Tipo: </label>
                            <select name="type" value={input.type} onChange={(e) => handleSelect(e)} className="mt-1 border h-9 bg-gray-300 border-gray-900">
                            
                                {tipos.map(ty => (
                                    <option key={ty} value={ty}>{ty}</option>
                                ))}
                            </select>

                            <label htmlFor="image" className="mt-4">Image: </label>
                            <input type="text" name="image" value={input.image} onChange={(e) => handlerChange(e)}></input>

                            <button
                                type="submit"
                                className="mt-8 border-2 border-gray-500 w-full h-10  text-black">
                                Actualizar Producto
                            </button>
                            <button
                            type="button"
                                className="mt-8 border-2 w-full h-10  text-white bg-red-500"
                                onClick={handleDelete}>
                                Eliminar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;
