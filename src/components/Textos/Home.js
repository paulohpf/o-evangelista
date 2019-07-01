import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as WordPressAPI from '../../Utils/WordPressApi';
import * as Utils from '../../Utils/Utils'
import {Row, Col, Card} from 'react-bootstrap/'
import './Home.scss';

var _ = require('lodash');

class Home extends Component {
    _isMounted = true;
    _isLoading = true;
    
    constructor(props) {
        super(props);
        
        this.state = {
            posts: [],
            posts_attachment: []
        };
        
        
        this.getPosts = this.getPosts.bind(this);
        this.updateAttachments = this.updateAttachments.bind(this);
        this.debouncedUpdateAttachments = _.debounce(this.updateAttachments, 500);
    }
    
    getPosts() {
        let self = this;
        let attachment = [];
        let posts = 1;
        WordPressAPI.getPosts('', function(response){
            posts = response;
            response.map(function(post, index){
                WordPressAPI.getPostAttachment(post._links[`wp:featuredmedia`][0].href, function(response){
                    if (self._isMounted) {
                        attachment[`${post.id}`] = response.media_details.sizes.medium.source_url;
                        self.debouncedUpdateAttachments(attachment);
                    }
                });
            });
        }).finally(function (){
            self._isLoading = false;
            if (self._isMounted) {
                self.setState({
                    posts: posts
                });
            }
        });
    }
    
    updateAttachments(attachments) {
        this.setState({
            posts_attachment: attachments
        });
    }
    
    componentDidMount() {
        this._isMounted = true;
        this._isLoading = true;
        this.getPosts();
    }
    
    componentWillUnmount() {
        this.debouncedUpdateAttachments.cancel();
        this._isMounted = false;
    }
    
    render() {
        let toRender;
        
        if(this.state.posts_attachment.lenght === 0 || this.state.posts_attachment === 'undefined') {
            toRender = '';
        } else {
            toRender = this.state.posts.map((post, index) => 
            
            <Col className={'post'} key={index}>
            {/* {this.state.posts_attachment[`${post.id}`] === 'undefined' ? '' : <Link to={`/post/${post.slug}`} ><img src={this.state.posts_attachment[`${post.id}`]} alt={post.title.rendered}/></Link> } */}
            {this.state.posts_attachment[`${post.id}`] === 'undefined' ? '' : 
            <Card>
            <Link to={`/post/${post.slug}`} ><Card.Img variant="left" src={this.state.posts_attachment[`${post.id}`]} alt={post.title.rendered}/></Link>
            <Card.Body>
                {console.log(post)}
            <Card.Text><div dangerouslySetInnerHTML={Utils.decodeHTML(post.excerpt.rendered)}></div> </Card.Text>
            <Link to={`/post/${post.slug}`} className={`btn btn-primary`}>Ler Mais</Link>
            {/* <a className={`btn btn-primary`}>Go somewhere</a> */}
            </Card.Body>
            </Card> }
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
    
    export default Home;