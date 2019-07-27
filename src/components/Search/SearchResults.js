import React, { Component } from 'react';
import * as WordPressAPI from '../../Utils/WordPressApi';
import {Row, Col} from 'react-bootstrap/'
import { Link } from "react-router-dom";
import SearchForm from './SearchForm';
import * as Utils from '../../Utils/Utils'
import './SearchResults.scss';

class SearchResults extends Component {
    _isMounted = true;
    _isLoading = true;
    
    constructor(props) {
        super(props);
        
        this.state = {
            searchValue: '',
            searchResults: []
        }
        
        this.getSearchResults = this.getSearchResults.bind(this);
    }
    
    componentDidMount() {
        this._isMounted = true;

        if(typeof this.props.location.state !== 'undefined') {
            this.getSearchResults(this.props.location.state.q !== null ? this.props.location.state.q : '');
        } else {
            this.getSearchResults('');
        }
    }
    
    componentDidUpdate(prevProps) {
        //Verifico se a pesquisa foi alterada
        if(typeof this.props.location.state !== 'undefined'){
            if (this.props.location.state.q !== prevProps.location.state.q) {
                window.location.reload();
            }
        }
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    //Retorno os resultados da pesquisa
    getSearchResults(searchValue) {
        let self = this;
        this._isLoading = true;
        WordPressAPI.getSearchResults(searchValue, function(response){
            if(self._isMounted){
                self._isLoading = false;
                self.setState({
                    searchValue: searchValue,
                    searchResults: response
                });
            }
        });
    }
    
    searchResults(){
        if (this.state.searchResults.length > 0) {
            console.log(this.state.searchResults);
            return <Row className={`results`}>
            {this.state.searchResults.map((result => 
                <Col key={result.id} xs={12} className={`result result-${result.id}`}>
                <Link className={`link`} to={`${Utils.transformPermalink(window.location.origin, result.permalink)}`}>
                <h3>{result.title}</h3>
                <cite>{result.permalink}</cite>
                </Link>
                <div className={`details`}>
                <span className={'date'}>{Utils.convertDate(result.date)}</span>
                <span className={`excerpt`} dangerouslySetInnerHTML={Utils.decodeHTML(result.excerpt)}></span>
                </div>
                
                </Col>
                ))}
                </Row>
                
            } else {
                return <Col className={``}>Não houve resultados para a sua pesquisa</Col>
            }
        }
        
        render(){
            return(
                <div className={`site-main content search-results ${this._isLoading === true ? 'loading' : '' }`}>
                <Row>
                <Col xs={12}>
                <SearchForm searchValue={`${this.state.searchValue}`}/>
                </Col>
                <Col xs={12}>
                <header className={`page-header`}>
                {this.state.searchValue !== '' ? <h2 className={`page-title`}>Resultados da pesquisa por: {this.state.searchValue}</h2> : null}
                </header>
                </Col>
                <Col xs={12}>
                {this.searchResults()}
                </Col>
                </Row>                
                </div>
                )
            }
        }
        
        export default SearchResults;