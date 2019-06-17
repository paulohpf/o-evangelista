import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import './Header.scss';
import logo from '../../images/logo.png'

class Header extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    
    render() {
        return(
            <Navbar className={'header'} sticky={'top'} expand="lg">
            <Navbar.Brand href="Brand"><img src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="header-navbar-nav"/>
            <Navbar.Collapse id="header-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Textos</Nav.Link>
            <Nav.Link>Edson Quinezi</Nav.Link>
            <Nav.Link>Contato</Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2 input-pesquisar" />
            <Button variant="link" className="btn-pesquisar"></Button>
            </Form>
            </Navbar.Collapse>
            </Navbar>
            )
        }
        
    }
    
    export default Header;