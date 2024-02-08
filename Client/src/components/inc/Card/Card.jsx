import 'tailwindcss/tailwind.css';
import StarRatings from 'react-star-ratings';
import { IoCartSharp } from "react-icons/io5";

const Card = (props) => {
    return (
        <div className="mt-10 rounded bg-neutral-900 w-11/12 h-40  ">
            <div className='flex pl-4   w-full space-x-26 items-start justify-center'>
                <div className='w-40 text-neutral-400 pt-2'>
                    <h2 className="text-left text-white text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{props.name}</h2>
                    <div className="flex items-center mb-2 w-40"> {/* Contenedor del componente StarRatings */}
                        <StarRatings
                            rating={5}
                            starDimension="18px"
                            starSpacing="1px"
                            starRatedColor="gold"
                            starEmptyColor="lightgray"

                        />
                    </div>
                    <h3 className="text-left overflow-hidden overflow-ellipsis whitespace-nowrap ">{props.descripcion}</h3>
                    <div className='mt-5 flex justify-between items-center mb-2'> {/* Contenedor para alinear elementos */}
                        <button className='text-red-100 w-20 flex justify-between  bg-green-600 bg-opacity-75 rounded p-1'>
                            <IoCartSharp className="text-2xl text-red-100" /> Add +
                        </button>
                        <h3 className="text-left">${props.precio}</h3>
                    </div>

                </div>
                <div className='w-56 h-40 ml-4 overflow-hidden rounded-md'>
                    <img className='w-full h-full aspect-w-1 aspect-h-1 object-cover ' src={props.image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Card;
