import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="bg-black bg-opacity-50 flex items-center justify-center min-h-screen " style={{ backgroundImage: 'url("https://img.freepik.com/fotos-premium/interior-bar-sillas-luces-noche-escena-nocturna-barra-bar-fondo-oscuro-noche-sillas-comodo-restaurante-lujo-vacio-ai-generado_538213-4841.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-black bg-opacity-50 flex flex-col items-center justify-center min-h-screen ">

                <div className="text-center mb-56 mt-36">
                    <h1 className="text-red-50 text-6xl">My Bar</h1>
                    <h1 className="text-red-50 font-mono italic tracking-wide text-2xl mb-2 mt-6">Cuidamos tu comida, cuidamos de ti.</h1>
                    <Link  to={`/menu`}>
                    <button className="text-red-50 w-44 h-11 mt-10 border-4 border-double border-pink-100 hover:bg-gray-200 hover:bg-opacity-25 transition duration-700">Menu</button>
                    </Link>
                </div>
                <div className="border-t-2 w-96 ">
                    <h2 className="text-red-50 mt-4">Av. Fray A. Alcalde 10, 44100 Guad., Jal., MX</h2>
                </div>

            </div>



        </div>
    )
}

export default Landing;
