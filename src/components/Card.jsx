import "../styles/Productos.css";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function CardProducto({producto}){
    console.log(producto)

    return(
        
        <Card style={{ height: "650px", minHeight: "650px" }}>
            <Card.Img variant="top" src={producto.imagen} style={{ maxHeight: "450px", objectFit: "cover" }} />
           <Card.Body>
            <Card.Title><h2 style={{color:"black"}} >{producto.name}</h2></Card.Title>
            <p style={{color:"black", maxHeight: "50px"}}>{producto.description}</p>
            <p style={{color:"green",maxHeight: "50px"}}> $ {producto.price}</p>
            <Link to={"/productos/" + producto.id} ><button type="button" class="btn btn-outline-success w-100">Ver detalles</button></Link>
            </Card.Body>
        </Card>
          
    )
}

export default CardProducto

