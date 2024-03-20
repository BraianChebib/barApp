import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { IoCartSharp } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa6';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../../fb';
import { logout, searchProductsByName } from '../../../redux/actions';
import CartPage from '../CartPage';
import logo from '../../../assets/logo.png'; // Asegúrate de importar el logo adecuadamente

const auth = getAuth(firebaseApp);

const NavBar = () => {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [showCartIcon, setShowCartIcon] = useState(true);
    const [userProfile, setUserProfile] = useState(null); // Estado para almacenar la información del usuario
    const loggedIn = useSelector(state => state.loggedIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.user);

    console.log(loggedIn)

    const logoPerfil = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Si hay un usuario autenticado, obtener su información de perfil
                if (user.photoURL && user.photoURL.trim() !== '') { // Verificar si photoURL está definido y no está vacío
                    setUserProfile(user.photoURL);
                } else {
                    setUserProfile(logoPerfil);
                }
            } else {
                setUserProfile(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProductsByName(name));
        setName("");
    };

    const logoutHandle = () => {
        signOut(auth)
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleInput = () => {
        setIsInputOpen(!isInputOpen);
        setShowCartIcon(false);
    };

    const toggleInput1 = () => {
        setIsInputOpen(!isInputOpen);
        setShowCartIcon(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const closeCart = () => {
        setCartOpen(false);
    };

    const cart = useSelector((state) => state.cart);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);




    return (
        <div className="relative z-20">
            {isInputOpen && (
                <div className={`absolute top-0 right-0 h-full border-b-2 flex justify-center bg-black text-neutral-400 transition-all duration-300 transform ${isInputOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <form onSubmit={handleSubmit} className="flex items-center justify-center">
                        <input
                            name="search"
                            type="search"
                            value={name}
                            placeholder="Search"
                            className="me-2 rounded bg-gray-800 w-36 h-7"
                            aria-label="Search"
                            onChange={handleChange}
                        />
                        <button type="submit" className="bg-transparent border border-transparent p-2 rounded-lg hover:border-white">
                            <BsSearch className="text-2xl text-red-50" />
                        </button>
                    </form>
                    <button onClick={toggleInput1} className="p-4 text-white">
                        <IoIosArrowForward className="text-3xl" />
                    </button>
                </div>
            )}

            <div className="flex justify-between w-full h-20 bg-black text-neutral-400 items-center border-b-2 border-b-sky-50">
                <div className="p-2">
                    <img className="w-16 h-14 p-1" src={logo} alt="Logo" />
                </div>
                <div className="flex">
                    {location.pathname !== '/' && (
                        <button onClick={toggleInput} className="bg-transparent border-transparent p-2 rounded-lg hover:border-white">
                            <BsSearch className="text-2xl text-red-50" />
                        </button>
                    )}
                    {showCartIcon && location.pathname !== '/' && (
                        <button onClick={toggleCart} className="block lg:hidden relative p-2">
                            <IoCartSharp className="text-3xl text-red-50" />
                            {totalQuantity > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>
                    )}
                    {userProfile ? (
                        <div className="block lg:hidden p-2">
                            <div className="w-9 h-9 overflow-hidden rounded-full">
                                <img src={userProfile} alt="Foto de perfil" className="w-full h-full object-cover" /> {/* Ajusta el tamaño de la imagen con "object-cover" */}
                            </div>
                        </div>

                    ) : (
                        <button className="block lg:hidden p-2">
                            <Link to="/LoginPanel">
                                <FaRegUser className="text-2xl text-red-50" />
                            </Link>
                        </button>
                    )}
                    <button className="block lg:hidden p-1" onClick={toggleMenu}>
                        <IoMdMore className="text-4xl text-red-50" />
                    </button>
                </div>
                <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-black absolute top-20 right-0  border-l w-2/4 `}>
                    <ul className="text-center">
                        {/* Solo renderiza el boton si eres rol admin */
                            user.role === "admin" ? <li className="py-2 border-b border-gray-700">
                                <Link to="/createProduct" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Crear Producto</Link>
                            </li> : null
                        }

                        <li className="py-2 border-b border-gray-700">
                            <Link to="/" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="py-2 border-b border-gray-700">
                            <Link to="/menu" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Menu</Link>
                        </li>
                        <li className="py-2 border-b border-gray-700">
                            <Link to="/about" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Reservation</Link>
                        </li>
                        <li className="py-2 border-b border-gray-700">
                            <Link to="/contact" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Contact</Link>
                        </li>
                        {loggedIn && <li className="py-2 border-b border-gray-700">
                            <Link to="/" className="block p-2 hover:bg-gray-800" onClick={logoutHandle}>Cerrar Sesión</Link>
                        </li>}
                        
                    </ul>
                </div>
            </div>
            <div className={`fixed top-0 left-0 min-w-full bg-white overflow-y-auto transition-height duration-300 z-2${cartOpen ? "h-screen" : "h-0"}`} style={{ height: "var(--cart-height)" }}>
                {cartOpen && <CartPage onCloseCart={closeCart} className="p-0 m-0" />}
            </div>
        </div>
    );
};

export default NavBar;
