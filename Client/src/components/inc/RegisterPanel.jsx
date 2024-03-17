import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions';
import firebaseConfig from '../../fb'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const RegisterPanel = () => {
    const dispatch = useDispatch();

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
        },
    });

    return (
        <div className="">
            <form onSubmit={formik.handleSubmit} className='flex flex-col w-full p-10  items-center justify-center'>
                <h1 className="text-3xl mb-6">Sign Up</h1>
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
