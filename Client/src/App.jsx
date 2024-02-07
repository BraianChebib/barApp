import './App.css';
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Menu from './components/views/Menu/Menu'
import NavBar from './components/inc/NavBar/NavBar';
import Landing from './components/views/Landing/Landing';

function App() {

    return (
        <div className="max-w-full h-screen  ">
             <NavBar></NavBar>
            <Routes>
             
                <Route exact path="/"element={<Landing />} />
                <Route path="/menu" element={<Menu/>}></Route>
            </Routes>
            
        </div>
    );
}

export default App;
