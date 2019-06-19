import React, { Component } from 'react';
import {Form, FormControl, Button} from 'react-bootstrap'
import './SearchForm.scss';

class SearchForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            searchValue: ''
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleOnClickSearchButton = this.handleOnClickSearchButton.bind(this);
    }

    handleChangeInput(event){
        this.setState({
            searchValue: event.target.value
        }, function(){
            console.log(this.state.searchValue)
        });
    }

    handleOnClickSearchButton() {
        console.log('.');
    }

    render() {
        return(
            <div className={'searchForm'}>
            <Form inline>
            <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2 input-pesquisar" value={this.state.searchValue} onChange={this.handleChangeInput} />
            <Button variant="link" className="btn-pesquisar" onClick={this.handleOnClickSearchButton}></Button>
            </Form>
            </div>
        )
    }
}

export default SearchForm;