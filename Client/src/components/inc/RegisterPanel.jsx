import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions';
import firebaseConfig from '../../fb'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { TiPencil } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";

const RegisterPanel = () => {
    const dispatch = useDispatch();

    const logoPerfil = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const auth = getAuth(firebaseConfig);
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );
                await sendEmailVerification(auth.currentUser);

                const userData = {
                    email: values.email,
                    name: values.name,
                    lastname: values.lastname,
                    id: userCredential.user.uid,
                };
                dispatch(register(userData));

                formik.resetForm();
            } catch (error) {
                const errorMessage = error.message;
                console.log(errorMessage)
            }
        }
    });

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        console.log(selectedImage)

        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setPreviewImage(null);
        }
    };

    return (
        <div className="">
            <form onSubmit={formik.handleSubmit} className='flex flex-col w-full p-10  items-center justify-center'>
                {/* <h1 className="text-3xl mb-6">Sign Up</h1> */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image"
                        onChange={handleImageChange}
                    />
                    <div onClick={() => document.getElementById('image').click()} style={{ position: 'absolute', bottom: 4, right: 4 }} className='border border-white rounded-full bg-pink-600 w-8 h-8 flex items-center justify-center text-white'>
                        <TiPlus></TiPlus>
                    </div>

                    <div className='w-36 h-36 overflow-hidden rounded-full'>
                        {previewImage ? <img className='w-full h-full object-cover' src={previewImage} alt="" /> : <img className='w-full h-full object-cover' src={logoPerfil} alt="" />}
                    </div>
                </div>

                <div className="text-left flex flex-col w-full">
                    <label htmlFor="name">Name</label>
                    <input className="mt-1 border h-9 bg-gray-300 border-gray-900" type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                    <label htmlFor="lastname" className="mt-4">Lastname</label>
                    <input className="mt-1 border h-9 bg-gray-300 border-gray-900" type="text" id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} />
                    <label htmlFor="email" className="mt-4">Email</label>
                    <input className="mt-1 border h-9 bg-gray-300 border-gray-900" type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    <label htmlFor="password" className="mt-4">Password</label>
                    <input className="mt-1 border h-9 bg-gray-300 border-gray-900" type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    <button type="submit" className="mt-8 border border-b-gray-900 border-l-gray-900 w-full h-10">Registrarse</button>
                </div>

            </form>
        </div>
    );
};

export default RegisterPanel;
