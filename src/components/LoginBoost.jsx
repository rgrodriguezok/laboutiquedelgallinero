import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function LoginBoost() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true)
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password).then((user) => {
      login(usuario)
      dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar")
    }).catch((error) => {
      if (error.code == "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar")
      } if (error.code == "auth/weak-password") {
        dispararSweetBasico("Contraseña debil", "Password should be at least 6 characters", "error", "Cerrar")
      }

    })
  }

  const handleSubmit2 = (e) => {
    logout()
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password).then((user) => {
      login(usuario)
      dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar")
    }).catch((error) => {
      if (error.code == "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar")
      }

    })
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show)
  }

  if (user || admin) {
    return (
      <form onSubmit={handleSubmit2} style={{ background: "black" }}>
        <button type="submit" style={{ marginTop: "100px", background: "white", color: "red" }} class="btn btn-outline-danger w-15">Cerrar sesión</button>
      </form>
    )
  } if (!user && show) {
    return (
      <div className="p-4 my-3 w-25 border rounded shadow mx-auto" style={{
        backgroundColor: "white", padding: "10px",
        textAlign: "center", color: "black", width: "100%", marginBottom: "10px"
      }}>
        <form onSubmit={iniciarSesionEmailPass}  >
          <h1>Iniciar sesión</h1>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
          </div>
          <button type="submit" style={{ marginTop: "2px", background: "white", color: "green" }} class="btn btn-outline-success w-15">Ingresar</button>
          <button type="submit" style={{ marginTop: "2px", background: "white", color: "red", marginLeft: "10px" }} class="btn btn-outline-danger w-15" onClick={handleShow}>Registrate</button>
        </form>
      </div>
    )
  } if (!user && !show) {
    return (
      <div className="p-4 my-3 w-25 border rounded shadow mx-auto" style={{
        backgroundColor: "white", padding: "10px",
        textAlign: "center", color: "black"
      }}>
        <form onSubmit={registrarUsuario}>
          <h1>Registrarse</h1>
          <div className="mb-3">
            <label className="form-label">Email</label> <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} className="form-control" required
            />
          </div>
          <button type="submit" style={{ marginTop: "2px", background: "white", color: "green" }} class="btn btn-outline-success w-15" onClick={handleShow}>Registrate</button>
          <button type="submit" style={{ marginTop: "2px", background: "white", color: "red", marginLeft: "10px" }} class="btn btn-outline-danger w-15" onClick={handleShow}>Iniciar Sesión</button>
        </form>

      </div>
    )
  }

}
export default LoginBoost;
