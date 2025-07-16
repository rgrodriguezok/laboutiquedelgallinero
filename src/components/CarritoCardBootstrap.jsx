import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    return (
        <Card className="mb-4">
        <Card.Body>
            <Row className="align-items-center">
            <Col md={3}>
                <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ maxHeight: "100px", objectFit: "contain", width: "100%" }}
                />
            </Col>
            <Col md={2}>
                <Card.Title><h2 className="carrito-titulo-producto"> Producto </h2>{producto.name}</Card.Title>
               
            </Col>
          
            <Col md={2}>
                <span><h2> Cantidad</h2>Cant: {producto.cantidad}</span>
            </Col>
            <Col md={2}>
                <span><h2> Precio unitario</h2>Precio: {producto.price} $</span>
            </Col>
            <Col md={2}>
            
                <span><h2> Sub total</h2>Subtotal: {producto.cantidad * producto.price} $</span>
            </Col>
            <Col md={1}>
                <Button variant="danger" onClick={borrarDelCarrito}>
               Eliminar
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;