import logo from "../../../assets/logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsByName } from "../../../redux/actions";
import { useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const NavBar = () => {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú
    const [isInputOpen, setIsInputOpen] = useState(false); // Estado para controlar la visibilidad del input de búsqueda
    const dispatch = useDispatch();
    const location = useLocation(); // Obtener la ubicación actual

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProductsByName(name))
        setName("")
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const toggleInput = () => {
        setIsInputOpen(!isInputOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <div className="relative">
            {/* Input de búsqueda */}
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
               {/* <div className="flex justify-end items-center"> */}
                   <button onClick={toggleInput} className="p-4 text-white">
                       <IoIosArrowForward className="text-3xl" />
                   </button>
           </div>
            )}

            <div className="flex justify-between w-full h-20 bg-black text-neutral-400 items-center border-b-2 border-b-sky-50">
                <div className="p-2">
                    <img className="w-16 h-14 p-1" src={logo} alt="" />
                </div>
                <div className="flex">
                    <button onClick={toggleInput} className="bg-transparent border-transparent p-2 rounded-lg hover:border-white">
                        <BsSearch className="text-2xl text-red-50" />
                    </button>
                    <button className="block lg:hidden p-2">
                        <IoCartSharp className="text-3xl text-red-50" />
                    </button>
                    {/* Botón del menú hamburguesa */}
                    <button className="block lg:hidden p-2" onClick={toggleMenu}>
                        <IoMenuOutline className="text-4xl text-red-50" />
                    </button>
                </div>
                {/* Menú lateral desplegable */}
                <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-black absolute top-20 right-0  border-l w-2/4 `}>
                    <ul className="text-center">
                    <li className="py-2 border-b border-gray-700">
                            <Link to="/createProduct" className="block p-2 hover:bg-gray-800" onClick={closeMenu}>Crear Producto</Link>
                        </li>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;