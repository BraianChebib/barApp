import Card from '../../inc/Card/Card';
import { applyFilters, getAllProducts } from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [filtro, setFiltro] = useState(null); // Inicializar con null o vacío


    useEffect(() => {
        dispatch(getAllProducts()).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleFilter = (filterType) => {
        if (filtro === filterType) {
            setFiltro(null); // Si el filtro actual es igual al filtro seleccionado, deseleccionarlo
        } else {
            setFiltro(filterType); // De lo contrario, establecer el filtro seleccionado
            dispatch(applyFilters([filterType]));
        }
    };

    const filteredProducts = products.filter(product => {
        if (!filtro) {
            return true; // Mostrar todos los productos cuando ningún filtro está seleccionado
        } else {
            return product.type === filtro;
        }
    });

    return (
        <div className='max-w-full min-h-screen bg-black flex flex-wrap items-start justify-center '>
            <div className='flex justify-between w-full h-14'>
                <button className={`text-red-50 border-b-2 border-r-2 flex-grow flex-shrink ${filtro === 'Platos' ? 'bg-gray-700' : ''}`} onClick={() => handleFilter('Platos')}>Platos</button>
                <button className={`text-red-50 border-b-2 border-r-2 flex-grow flex-shrink ${filtro === 'Bebidas' ? 'bg-gray-700' : ''}`} onClick={() => handleFilter('Bebidas')}>Bebidas</button>
                <button className={`text-red-50 border-b-2  flex-grow flex-shrink ${filtro === 'Postres' ? 'bg-gray-700' : ''}`} onClick={() => handleFilter('Postres')}>Postres</button>
            </div>

            <div className='flex flex-col h-full w-full justify-center items-center mb-7'>

            {filteredProducts.map((props) => (
                <Card
                    key={props.id}
                    id={props.id}
                    name={props.name}
                    precio={props.precio}
                    descripcion={props.descripcion}
                    image={props.image}
                />
            ))}

            </div>
            
           
        </div>
    )
}

export default Menu;
