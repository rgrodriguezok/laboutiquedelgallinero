import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4" >
      <Row className="align-items-center">

        <Col>
          <h2 style={{ color: "white" }}>La Boutique del Gallinero</h2>
          <p style={{ color: "white" }}>Las Últimas Novedades y Exclusivos del Mundo Riverplatense, Primero Aquí.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;
