import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";
import firebaseApp from "../../fb";
import { Link } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

const LoginPanel = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            setFormData({
                email: "",
                password: "",
            });

            // alert("Logged in"); // usar otro tipo de alerta
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
        }
    };

    const loginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, gProvider);
            const id = result.user.uid;
            const email = result.user.email;
            const nameUser = result.user.displayName;
            const nameArray = nameUser.split(' ');

            const name = nameArray[0];
            const lastname = nameArray.slice(1).join(' ');

            const sendVerificationEmail = async () => {
                await sendEmailVerification(auth.currentUser);
            };

            sendVerificationEmail().catch((error) => console.log(error));

            const userData = {
                email,
                id,
                name,
                lastname
            };

            dispatch(register(userData));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <form onSubmit={handleSubmit} className="flex flex-col w-full p-10  items-center justify-center">
                {/* <PiUserCircleLight className="text-9xl"></PiUserCircleLight> */}

                <h1 className="text-3xl mb-6">Iniciar Sesión</h1>
                <div className="text-left flex flex-col w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 border h-9 bg-gray-300 border-gray-900"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password" className="mt-4">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 border h-9 bg-gray-300 border-gray-900"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>


                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" className="mt-8 border w-full h-10 bg-gray-500 text-white">Ingresar</button>

                <h1 className="mt-6">Or login with</h1>

                <button onClick={loginGoogle} className="flex mt-4 items-center justify-center bg-white text-gray-700 w-full rounded-md shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <img
                        className="w-6 h-6 mr-2"
                        src="https://entredichos.trabajosocial.unlp.edu.ar/wp-content/uploads/sites/6/2016/12/Google_-G-_Logo.svg_.png"
                        alt="Google Logo"
                    />
                    <span className="font-semibold">Log in with Google</span>
                </button>

                <Link to={"/registerPanel"}><h3 className="mt-6 text-blue-500 underline">Crear cuenta</h3></Link>

                

            </form>


        </div>
    );
};

export default LoginPanel;
