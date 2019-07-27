import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as WordPressAPI from '../../Utils/WordPressApi';
import * as Utils from '../../Utils/Utils'
import {Row, Col} from 'react-bootstrap/'
import './Textos.scss';

// var _ = require('lodash');

class Textos extends Component {
    _isMounted = true;
    _isLoading = true;
    
    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        };
        
        
        this.getPosts = this.getPosts.bind(this);
    }
    
    getPosts() {
        let self = this;
        WordPressAPI.getPosts(function(response){
            self._isLoading = false;
            if (self._isMounted) {
                self.setState({
                    posts: response
                });
            }
        });
    }
    
    componentDidMount() {
        this._isMounted = true;
        this._isLoading = true;
        this.getPosts();
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        let toRender;
        
        if(this.state.posts.length === 0 || this.state.posts === 'undefined') {
            toRender = '';
        } else {
            toRender = this.state.posts.map((post) => 
            <Col xs={12} key={post.id}>
            {post.media.thumbnail === 'undefined' ? '' : 
            <div className={'post'}>
                <Link to={`/post/${post.slug}`} className={`post-thumbnail`} ><img src={post.media.thumbnail} alt={post.title}/></Link>
            <div className={`post-entry`}>
                    <Link to={`/post/${post.slug}`} className={`post-title`}>{post.title}</Link>
                    <div className={`post-content`} dangerouslySetInnerHTML={Utils.decodeHTML(post.excerpt)}></div>
                    {/**TODO:
                        Mudar o "to=" para o link da URL antes de publicar
                     */}
                    <Link to={`/post/${post.slug}`} className={`post-readmore`}>Ler mais...</Link>
                </div>
            </div> }
            </Col>
            
            
            )
        }
        
        return(
            <div className={`site-main ${this._isLoading === true ? 'loading' : ''} `}>
            <div className={'home'}>
            <Row>
            {toRender}
            </Row>
            </div>
            </div>
            )
        }
    }
    
    export default Textos;