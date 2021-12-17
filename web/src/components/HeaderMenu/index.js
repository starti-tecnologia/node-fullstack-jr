import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Header } from './styles';
import logo from '../../assets/caixa.png'

export default function Home() {
  return (
    <Container>
      <img src={logo} alt="img" />
      <Header> 
        <Link to="/">
          Inicio
        </Link>  
        <Link to="/registroProduto">
          Registrar Nova Produto
        </Link>                            
      </Header>
    </Container>
  );
}
