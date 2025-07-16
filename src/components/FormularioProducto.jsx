import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { Button, Modal } from 'react-bootstrap';

function FormularioProducto({ }) {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ""
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };


  const handleOpenAddProductModal = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      setShowAddProductModal(true);
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar");
    }
  };


  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };


  const confirmAndAddProduct = () => {
    agregarProducto(producto).then(() => {
      setProducto({ name: '', price: '', description: '', imagen: "" });
      dispararSweetBasico("Producto agregado", "El producto se ha añadido correctamente.", "success", "Cerrar");
      handleCloseAddProductModal();
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar");
      handleCloseAddProductModal();
    });
  };


  if (!admin) {
    return (
      <Navigate to="/login" replace />
    )
  }

  return (
    <div className="p-4 my-3 w-50 border rounded shadow mx-auto" style={{
      backgroundColor: "white", padding: "10px",
      textAlign: "center", color: "black", width: "100%"
    }} >
      <form onSubmit={handleOpenAddProductModal}>
        <h3>Agregar Producto</h3>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text" name="name" value={producto.name || ''}
            onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de la Imagen</label>
          <input
            type="text" name="imagen" value={producto.imagen} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3 w-35">
          <label className="form-label">Precio:</label>
          <input type="number" name="price" value={producto.price || ''}
            onChange={handleChange} className="form-control" required min="0" style={{ borderRadius: "10px", height: "45px" }} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <button type="submit" style={{ marginTop: "2px" }} class="btn btn-outline-success w-10">Agregar Producto</button>

        </div>
      </form>

      <Modal show={showAddProductModal} onHide={handleCloseAddProductModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres agregar este producto?
          <br />
          <strong>Nombre:</strong> {producto.name}
          <br />
          <strong>Precio:</strong> ${producto.price}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddProductModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={confirmAndAddProduct}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioProducto;