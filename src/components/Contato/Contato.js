import React, { Component } from 'react';
import './Contato.scss';
import { Row, Col, Button } from 'react-bootstrap/'
import * as WordPressAPI from '../../Utils/WordPressApi';
import * as Utils from '../../Utils/Utils';
import { debounce } from 'lodash';

// var _ = require('lodash');

class Contato extends Component {
    _isMounted = true;

    constructor(props) {
        super(props);

        this._isLoading = false;

        this.state = {
            _isLoading: false,
            pageInfo: {},
            name: '',
            email: '',
            subject: '',
            message: ''
        };

        this.getPageInfo = this.getPageInfo.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getPageInfo() {
        let self = this;
        this._isLoading = true;
        this.setState({
            _isLoading: true
        }, function () {
            WordPressAPI.getSinglePage('contato', function (response) {
                if (self._isMounted !== false) {
                    self.setState({
                        _isLoading: false,
                        pageInfo: response
                    }, function () {
                        console.log(self.state.pageInfo);
                        console.log(self.state._isLoading);
                    });
                }
            });
        });
    }

    handleChange(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;

        switch (inputName) {
            case 'name':
                this.setState({
                    name: inputValue
                });
                break
            case 'email':
                this.setState({
                    email: inputValue
                });
                break
            case 'subject':
                this.setState({
                    subject: inputValue
                });
                break
            case 'message':
                this.setState({
                    message: inputValue
                });
                break
            default:
                return false;
        }
    }

    debounceEvent(...args) {
        this.debouncedEvent = debounce(...args)
        return e => {
            e.preventDefault();
            e.persist();
            return this.debouncedEvent(e);
        }
    }

    submitMessage() {
        console.table({
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
        });
    }

    componentDidMount() {
        this.getPageInfo();
    }

    render() {
        return (
            <div className={`site-main content contato ${this.state._isLoading === true ? 'loading' : ''}`}>
                <header className={`entry-header`}><h2 className={`entry-title`}>{this.state.pageInfo.title}</h2></header>

                <div dangerouslySetInnerHTML={Utils.decodeHTML(this.state.pageInfo.content)}></div>

                <div className={`contact-form`}>
                    <form onSubmit={this.debounceEvent(this.submitMessage, 500)}>
                        <Row>
                            <Col sm="12">
                                <label>
                                    Seu nome<span className={`required`}>*</span>
                                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                                </label>
                            </Col>
                            <Col sm="12">
                                <label>
                                    Seu e-mail<span className={`required`}>*</span>
                                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>
                                </label>
                            </Col>
                            <Col sm="12">
                                <label>
                                    Assunto
                                    <input type="text" name="subject" value={this.state.subject} onChange={this.handleChange}></input>
                                </label>
                            </Col>
                            <Col sm="12">
                                <label>
                                    Sua mensagem<span className={`required`}>*</span>
                                    <textarea name="message" value={this.state.message} onChange={this.handleChange}></textarea>
                                </label>
                            </Col>
                            <Col sm="12">
                                <Button type="submit">Enviar</Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        )
    }

}

export default Contato;