import React, { Component } from 'react';
import * as WordPressAPI from '../../Utils/WordPressApi';
import {Row, Col} from 'react-bootstrap/'
import './Home.scss';

var _ = require('lodash');

class Home extends Component {
    
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
                    attachment[`${post.id}`] = response.media_details.sizes.medium.source_url;
                    self.debouncedUpdateAttachments(attachment);
                });
            });
        }).finally(function (){
            self.setState({
                posts: posts
            });
        });
    }
    
    updateAttachments(attachments) {
        this.setState({
            posts_attachment: attachments
        });
    }
    
    componentDidMount() {
        this.getPosts();
    }
    
    render() {
        let toRender;
        
        if(this.state.posts_attachment.lenght === 0 || this.state.posts_attachment === 'undefined') {
            toRender = '';
        } else {
            toRender = this.state.posts.map((post, index) => 
            
            <Col className={'post'}>
            {this.state.posts_attachment[`${post.id}`] === 'undefined' ? '' : <a href={post.link} ><img src={this.state.posts_attachment[`${post.id}`]} alt={post.title.rendered}/></a> }
            </Col>
            
            
            )
        }
        
        return(
            <div className={'home'}>
            <Row>
            {toRender}
            </Row>
            </div>
            )
        }
    }
    
    export default Home;