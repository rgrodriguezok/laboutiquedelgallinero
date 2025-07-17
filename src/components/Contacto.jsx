import React, { useState } from 'react'; // Don't forget to import useState
import "../styles/Contacto.css";

function Contacto() {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleSubmit = () => {
        // Here you would typically handle form submission (e.g., send data to a server)
        // For this example, we'll just show the modal
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="contacto-container">
            <h1>Formulario de Contacto</h1>
            <p>Escribinos un mensaje y nos contactaremos a la brevedad</p>
            <input type="text" className="form-control mb-3" placeholder="Nombre" required />
            <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required />
            <textarea type="text" className="form-control mb-3" placeholder="Mensaje" required />
            <button type="button" className="btn btn-outline-success w-50" onClick={handleSubmit}>
                Enviar
            </button>

            {/* Modal structure */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>¡Mensaje Enviado!</h2>
                        <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                        <button className="modal-close-btn" onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contacto;
