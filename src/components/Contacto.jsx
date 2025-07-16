import "../styles/Contacto.css"

function Contacto() {

    return (
       


            <div className="contacto-container"> 
                <h1>Formulario de Contacto</h1>
                <p>Escribinos un mensaje y nos contactaremos a la brevedad</p>
                <input type="text" className="form-control mb-3" placeholder="Nombre" required />
                <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required />
                <textarea type="text" className="form-control mb-3" placeholder="Mensaje" required />
                <button type="button" class="btn btn-outline-success w-50">Enviar</button>
            </div>
  

    );
}

export default Contacto;