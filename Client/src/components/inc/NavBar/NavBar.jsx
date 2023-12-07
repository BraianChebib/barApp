import logo from "../../../assets/logo.png"

const NavBar = () => {
    return (
        <div className="w-full h-20 bg-black flex text-neutral-400 items-center border-b-2 border-b-sky-50">
            <div className="p-2">
                <img className="w-16 h-14 p-1" src={logo} alt="" />
            </div>
            <h1 className="text-2xl">My Bar</h1>

        </div>
    )

}

export default NavBar;