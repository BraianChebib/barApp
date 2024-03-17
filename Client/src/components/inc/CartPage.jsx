import React from 'react';
import { useSelector } from 'react-redux';
import Cart from './Cart';

const CartPage = ({ onCloseCart }) => {
    const cart = useSelector(state => state.cart);

    const total = cart.reduce((acc, item) => acc + item.quantity * item.precio, 0);

    return (
        <div className='bg-gray-900 h-screen overflow-y-scroll'>
            <div className='flex justify-between text-gray-400 p-3 border-b-2'>
                <h1>CARRITO DE COMPRAS</h1>
                <button onClick={onCloseCart}>X</button>
            </div>

            <ul>
                {cart.map(props => (
                    <Cart
                        key={props.id}
                        id={props.id}
                        name={props.name}
                        precio={props.precio}
                        quantity={props.quantity}
                        image={props.image}/> 
                ))}
            </ul>

            <h1 className='text-gray-400'>Total a pagar: ${total}</h1>
        </div>
    );
};

export default CartPage;
