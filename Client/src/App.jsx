import './App.css';
import Menu from './components/views/Menu/Menu'
import NavBar from './components/inc/NavBar/NavBar';

function App() {

    return (
        <div className="max-w-full h-screen  ">
            <NavBar></NavBar>
            <Menu></Menu>
        </div>
    );
}

export default App;
