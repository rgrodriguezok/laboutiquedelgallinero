import { useEffect,useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductosContainer from './components/ProductosContainer';
import About from './components/About';
import Contacto from './components/Contacto';
import Admin from './components/Admin';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/Formularioedicion';
import { useAuthContext } from './contexts/AuthContext';
import NavBoostrap from './components/NavBoostrap';
import CarritoBootstrap from './components/CarritoBootstrap';
import LoginBoost2 from './components/LoginBoost2';
import ProductoDetalleBoostrap from './components/ProductoDetalleBoostrap';

function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])

  return (
<Router>
      <div>
        <NavBoostrap/>
        <Routes>
          <Route path="/" element={<Home />}/>
          {}
          <Route path="/login" element={<LoginBoost2/>} />
          <Route path="/productos" element={<ProductosContainer/>}/>
          <Route path="/carrito" element={<CarritoBootstrap /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos/:id" element={<ProductoDetalleBoostrap/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/admin/agregarProductos" element={<FormularioProducto/>}/>
          <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;