import logo from "../../../assets/logo.png"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsSearch } from 'react-icons/bs';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsByName } from "../../../redux/actions";
import { useLocation } from "react-router-dom";

const NavBar = () => {
    const [name, setName] = useState("");
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

    return (
        <div className="flex justify-between w-full h-20 bg-black flex text-neutral-400 items-center border-b-2 border-b-sky-50 space-x-4">
            <div className="p-2">
                <img className="w-16 h-14 p-1" src={logo} alt="" />
            </div>
            {/* <h1 className="text-2xl">My Bar</h1> */}

            {location.pathname !== "/" && ( // Mostrar el formulario solo si la ruta no es "/"
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        name="search"
                        type="search"
                        value={name}
                        placeholder="Search"
                        className="me-2 rounded bg-gray-800 w-36 mr-1 h-7"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <Button variant="outline-success" type="submit" className="m-2">
                        <BsSearch />
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default NavBar;