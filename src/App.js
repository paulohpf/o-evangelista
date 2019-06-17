import React from 'react';
import {Container} from 'react-bootstrap'
import './App.scss';
import Header from './components/header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
    <Header />
    <Container fluid={true}>
      <Home></Home>
    </Container>
    <Footer />
    </div>
  );
}

export default App;
