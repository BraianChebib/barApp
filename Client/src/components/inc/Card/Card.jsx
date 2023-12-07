import 'tailwindcss/tailwind.css';

const Card = (props) => {
    return (
        <div className="mt-5 rounded bg-neutral-900 w-11/12 h-30 ">
       
                <div className='flex p-4 w-full space-x-26 items-start justify-center'>
                    <div className='w-40 text-neutral-400'>
                        <h2 className="text-left text-white text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{props.name}</h2>
                        <h3 className="text-left overflow-hidden overflow-ellipsis whitespace-nowrap ">{props.descripcion}</h3>

                        <div className='mt-5'>
                            <h3 className="text-left">${props.precio}</h3>
                        </div>
                    </div>


                    <div className='w-32 h-24 ml-4 overflow-hidden rounded-md'>
                        <img className='w-full h-full aspect-w-1 aspect-h-1 object-cover ' src={props.image} alt="" />
                    </div>

                </div>



        </div>
    )
}

export default Card; 