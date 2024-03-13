import 'tailwindcss/tailwind.css';
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {delAllProductCart, delFromCar, addCantProdCart} from "../../redux/actions"

const Cart = (props) => {

    const dispatch = useDispatch();

    const removeItem =(event) =>{
        event.preventDefault();
        dispatch(delAllProductCart(props.id))
    }
    const removeOneItem = (event) =>{
        event.preventDefault();
        dispatch(delFromCar(props.id))
    }
    const addOneItem = (event) =>{
        event.preventDefault();
        dispatch(addCantProdCart(props.id))        
    }
    const subtotal= props.quantity * props.precio

    return (
        <div className="bg-black py-4 min-h-full px-6 mb-4 rounded-lg shadow-lg z-2">

            <div className='flex justify-between items-center'>
                <div className='w-20 h-16 overflow-hidden rounded-md mr-4'>
                    <img className='w-full h-full object-cover' src={props.image} alt="" />
                </div>
                <div className="flex-grow ">
                    <h2 className="text-left text-white text-xl overflow-hidden overflow-ellipsis whitespace-nowrap mb-2">{props.name}</h2>
                    <div className='flex items-center justify-between text-white w-28 text-lg mb-2'>
                        <button className='w-6 h-6 border border-white flex items-center justify-center' onClick={removeOneItem}>-</button>
                        <h3 className="mx-2">{props.quantity}</h3>
                        <button className='w-6 h-6  border border-white flex items-center justify-center' onClick={addOneItem}>+</button>
                    </div>
                </div>
                <div className='flex flex-col h-16 max-h-full justify-between items-end'>
                    <button className="mb-2" onClick={removeItem}>
                        <FaTrashAlt className="text-red-500" />
                    </button>
                    <h3 className="text-white">${subtotal}</h3>
                </div>
            </div>

        </div>
    )
}

export default Cart;
