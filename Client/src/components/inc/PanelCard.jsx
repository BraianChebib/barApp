import { IoCartSharp } from "react-icons/io5";

const PanelCard = ({ onClose,handleAddToCart, name, descripcion, image, precio }) => {
    return (
        <div className="fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
            <div className="bg-gray-100 w-72 max-h-96 shadow-2xl rounded">
                <div className="">
                    <div className='max-w-full h-40 overflow-hidden relative'>
                        <button onClick={onClose} className="text-gray-200 bg-black bg-opacity-50 rounded-full hover:text-gray-200 absolute top-0 right-0 mt-2 mr-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img className='w-full h-full object-cover' src={image} alt="" />
                    </div>

                    <div className="flex flex-col justify-between px-2 py-2 h-auto text-left">

                        <div className="px-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
                            <p className="text-sm text-gray-600">{descripcion}</p>
                        </div>


                        <div className="flex justify-between mt-4">
                            <button className='text-red-100 w-20 flex justify-between bg-green-600 bg-opacity-75 rounded p-1'  onClick={handleAddToCart}>
                                <IoCartSharp className="text-2xl text-red-100" /> Add +
                            </button>
                            <h4 className="font-semibold text-gray-800">${precio}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelCard;
