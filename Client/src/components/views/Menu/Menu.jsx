import Card from '../../inc/Card/Card';
// import characters from '../../../assets/data';
import * as actions from "../../../redux/actions"
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

const Menu = () =>{
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(actions.getAllProducts()).catch((error) => {
          console.error(error);
        });
      }, []);
    
    return(
        <div>
            {products.map((props) => (
               
               <Card
                   key={props.id}
                   name={props.name}
                   precio={props.precio}
                   descripcion={props.descripcion}
                   image={props.image}
               />
           ))}

        </div>
    )
}

export default Menu;