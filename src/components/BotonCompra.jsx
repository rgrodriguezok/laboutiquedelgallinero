import styled from "styled-components";

const BotonCompra = styled.button`
  background-color: green;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
  background-color: grey;
  }
`;

function Producto({text}) {
  return <BotonCompra>{text}</BotonCompra>;
}

export default Producto