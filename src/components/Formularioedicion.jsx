import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function FormularioEdicion({ }) {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) {
    return (
      <Navigate to="/login" replace />
    )
  }

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if (error == "Producto no encontrado") {
        setError("Producto no encontrado")
      }
      if (error == "Hubo un error al obtener el producto.") {
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return ("El nombre es obligatorio.")
    }
    if (!producto.price || producto.price <= 0) {
      return ("El precio debe ser mayor a 0.")
    }
    console.log(producto.description.trim())
    if (!producto.description.trim() || producto.description.length < 10) {
      return ("La descripción debe tener al menos 10 caracteres.")
    }
    if (!producto.imagen.trim()) {
      return ("La url de la imgaen no debe estar vacía")
    }
    else {
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      editarProducto(producto).then((prod) => {
        toast.success('Producto actualizado correctamente.');
      }).catch((error) => {
        toast.error('Hubo un problema al actualizar el producto. ' + error.message);
      })
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }

  };

  return (
    <div className="p-4 my-3 w-50 border rounded shadow mx-auto" style={{ background: "white" }}>
      <form onSubmit={handleSubmit} >
        <h2 style={{ color: "red" }}>Editar Producto</h2>
        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>Nombre:</label>
          <input type="text" name="name" value={producto.name || ''} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>URL de la Imagen</label>
          <input
            type="text" name="imagen" value={producto.imagen} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>Precio:</label>
          <input
            type="number" name="price" value={producto.price || ''} onChange={handleChange} className="form-control" required min="0" />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>Descripción:</label>
          <textarea name="description" value={producto.description || ''} onChange={handleChange} className="form-control" required
          />
        </div>
        <button type="submit" class="btn btn-outline-success w-10">Actualizar Producto</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default FormularioEdicion