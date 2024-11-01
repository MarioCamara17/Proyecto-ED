import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import Menu from './componentes/menu';
import Rutas from './routes/Rutas';



function App() {
 
  return (
    <Router>
    <div className="container-fluid">
    <Menu/>
    <Rutas/>
    </div>
    </Router>
  );
}

export default App;