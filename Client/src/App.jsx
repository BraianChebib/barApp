import './App.css';
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Menu from './components/views/Menu/Menu'
import NavBar from './components/inc/NavBar/NavBar';
import Landing from './components/views/Landing/Landing';
import FormProduct from './components/views/FormProduct';
import LoginPanel from './components/inc/LoginPanel';
import RegisterPanel from './components/inc/RegisterPanel'

function App() {

    return (
        <div className="max-w-full h-screenz  ">
             <NavBar></NavBar>
            <Routes>

                <Route exact path="/"element={<Landing />} />
                <Route path="/menu" element={<Menu/>}></Route>
                <Route path="/createProduct" element={<FormProduct/>}></Route>
                <Route path="/loginPanel" element={<LoginPanel/>}></Route>
                <Route path="/registerPanel" element={<RegisterPanel/>}></Route>
            </Routes>

        </div>
    );
}

export default App;
