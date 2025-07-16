import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";

function CarruselBootstrap() {
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductos().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const primerosTres = productos.slice(0, 4);
    console.log(primerosTres)

    if (cargando) return <p>Cargando carrusel...</p>;
    if (primerosTres.length === 0) return <p >No hay productos para mostrar.</p>;

    return (
        <Container className="my-4">
            <Carousel>
                {primerosTres.map((producto) => (
                    <Carousel.Item key={producto.id} >
                        <img
                            className="d-block w-100"
                            src={producto.imagen}
                            alt={producto.name}
                            style={{ height: "650px", objectFit: "contain" }}
                        />
                        <Carousel.Caption >
                            <div style={{ color: "black", background: "white", width: "200px" }}>
                                <h3 style={{ color: "red" }}>{producto.name}</h3>
                                <p style={{ color: "red" }}>{producto.description}</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default CarruselBootstrap;