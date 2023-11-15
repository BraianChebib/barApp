import 'tailwindcss/tailwind.css';

const Card =(props) =>{
    return(
        <div className="bg-white w-full rounded-lg mb-2 shadow-md md:p-6 lg:p-8">
            <h1 className="">{props.name}</h1>
            <h3>{props.precio}</h3>
            <h3>{props.descripcion}</h3>
            <img src={props.image} alt="" />
        </div>
    )
}

export default Card; 