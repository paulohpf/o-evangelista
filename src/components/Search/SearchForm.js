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
    
    render() {
        var redirect = null
        
        if(this.state.redirect) {
            console.log(this.state.redirect);
            redirect = <Redirect push to={{
                pathname:`/search/`,
                search:`${this.state.searchValue}`
            }}/>;
        }
        
        return(
            <div className={'searchForm'}>
            {redirect}
            <Form inline onSubmit={this.handleSubmit}>
            <FormControl name={'inputSearch'} type="text" placeholder="Pesquisar" className="mr-sm-2 input-pesquisar" value={this.state.searchValue} onChange={this.handleChangeInput} />
            <Button variant="link" className="btn-pesquisar" onClick={this.handleSubmit}></Button>
            </Form>
            </div>
            )
        }
    }
    
    export default SearchForm;