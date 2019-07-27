import React, { Component } from 'react';
import {Form, FormControl, Button} from 'react-bootstrap'
import { Redirect } from 'react-router'
import './SearchForm.scss';

class SearchForm extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            searchValue: '',
            redirect: false
        };
        
        this.handleChangeInput = this.handleChangeInput.bind(this);
        // this.handleOnClickSearchButton = this.handleOnClickSearchButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate() {
        if(this.state.redirect) {
            this.setState({
                redirect: false
            });
        }
    }
    
    handleChangeInput(event){
        this.setState({
            searchValue: event.target.value
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        if(this.state.searchValue !== '') {
            this.setState({
                redirect: !this.state.redirect
            });
        }
    }

    //Verifico se é necessário realizar um redirect
    handleRedirect(){
        if(this.state.redirect) {
            return <Redirect push to={{
                pathname:`/search/?q=${this.state.searchValue}`,
                state: { q: this.state.searchValue }
            }}/>;
        }
    }
    
    render() {
        return(
            <div className={'searchForm'}>
            {this.handleRedirect()}
            <Form inline onSubmit={this.handleSubmit}>
            <FormControl name={'inputSearch'} type="text" placeholder="Pesquisar" className="mr-sm-2 input-pesquisar" value={this.state.searchValue} onChange={this.handleChangeInput} />
            <Button variant="link" className="btn-pesquisar" onClick={this.handleSubmit}></Button>
            </Form>
            </div>
            )
        }
    }
    
    export default SearchForm;