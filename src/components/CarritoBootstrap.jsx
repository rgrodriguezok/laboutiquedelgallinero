import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container, Modal } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";
import Row from 'react-bootstrap/Row';


function CarritoBootstrap() {
    const { user } = useContext(AuthContext);
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);
    const [showModal, setShowModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [showClearCartModal, setShowClearCartModal] = useState(false);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad,
        0
    );


    function openConfirmationModal(id) {
        setProductIdToDelete(id);
        setShowModal(true);
    }


    function closeConfirmationModal() {
        setShowModal(false);
        setProductIdToDelete(null);
    }


    function confirmAndDeleteProduct() {
        if (productIdToDelete) {
            borrarProductoCarrito(productIdToDelete);
            closeConfirmationModal();
        }
    }

    function openClearCartModal() {
        setShowClearCartModal(true);
    }


    function closeClearCartModal() {
        setShowClearCartModal(false);
    }


    function confirmAndClearCart() {
        vaciarCarrito();
        closeClearCartModal();
    }


    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Container className="my-4">
            <Row xs={1} md={1} lg={1} >
                <h1 className="mb-3" style={{ color: "red" }}>Carrito de compras</h1>


                {productosCarrito.length > 0 ? (
                    productosCarrito.map((producto) => (
                        <CarritoCardBootstrap

                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={openConfirmationModal}
                        />

                    ))
                ) : (

                    <p style={{ color: "white" }}>Carrito vacío</p>
                )}
                <Button variant="btn btn-outline-danger" className="mb-4" onClick={openClearCartModal}>
                    Vaciar carrito
                </Button>
            </Row>

            {total > 0 && (
                <h4 className="mt-4 text-end" style={{ color: "white" }}>Total a pagar: {total.toFixed(3)} $</h4>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={closeConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este producto del carrito?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmationModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmAndDeleteProduct}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            { }
            <Modal show={showClearCartModal} onHide={closeClearCartModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar vaciar carrito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeClearCartModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmAndClearCart}>
                        Vaciar Carrito
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CarritoBootstrap;