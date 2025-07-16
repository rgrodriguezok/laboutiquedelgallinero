import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productos.css";
import Card from "./Card"
import { dispararSweetBasico } from "../assets/SweetAlert";
import Carrito from "./Carrito"


function ProductosContainer1({functionCarrito} ){
    const { id } = useParams();
    const [productos, setProductos] = useState([])
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    {useEffect(() =>{
         fetch('https://68221963b342dce8004d1cdf.mockapi.io/productos')
        .then((res) => res.json())
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un error al cargar los productos.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{

        return(

            <div className="productos-container">
                 {productos.map((producto) => (
                     <Card
                        producto={producto}
                    />
                 ))}
            </div>

        )
    }
}

export default ProductosContainer1