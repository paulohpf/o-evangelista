import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import SearchForm from '../Search/SearchForm'
import { Link } from "react-router-dom";

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
            <Navbar.Brand href="/"><img src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="header-navbar-nav"/>
            <Navbar.Collapse id="header-navbar-nav">
            <Nav className="mr-auto">
            <Link to="/" className={'nav-link'}>Home</Link>
            <Link to="/" className={'nav-link'}>Textos</Link>
            <Link to="/" className={'nav-link'}>Edson Quinezi</Link>
            <Link to="/contato" className={'nav-link'}>Contato</Link>
            </Nav>
            <SearchForm />
            </Navbar.Collapse>
            </Navbar>
            )
        }
        
    }
    
    export default Header;