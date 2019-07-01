import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import './Footer.scss';

class Footer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    
    render() {
        return (
            <div className={'footer'}>
            <Container>
            <Row>
            <Col></Col>
            <Col xs={6}>
                <span>O EVANGELISTA - 2019 - TODOS OS DIREITOS RESERVADOS.</span>
            </Col>
            <Col className={'social'}>
            <Row>
            <Col><a className={'facebook'} href="https://www.facebook.com/oevangelista.quinezi/"></a></Col>
            <Col><a className={'instagram'} href="#"></a></Col>
            </Row>
            </Col>
            </Row>
            </Container>
            </div>
            )
        }
    }
    
    export default Footer;