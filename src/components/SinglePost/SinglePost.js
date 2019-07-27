import React, { Component } from 'react';
import * as WordPressAPI from '../../Utils/WordPressApi';
import {Row, Col} from 'react-bootstrap/'
import { Link } from "react-router-dom";
import './SinglePost.scss';
import * as Utils from '../../Utils/Utils'

// var _ = require('lodash');

class SinglePost extends Component {
    _isMounted = true;
    _isLoading = false;
    
    constructor(props) {
        super(props);
        
        this.state = {
            postslug: '',
            postData: [],
            mostRecentPosts: []
        };
        
        this.getSinglePost = this.getSinglePost.bind(this);
        this.getPostAttachment = this.getPostAttachment.bind(this);
        this.getMostRecentPosts = this.getMostRecentPosts.bind(this);
    }
    
    getSinglePost(postslug) {
        let self = this;
        this._isLoading = true;
        WordPressAPI.getSinglePost(postslug, function(response) {
            self.setState({
                postData: response
            }, function() {
                self._isLoading = false;
            });
        })
    }
    
    getMostRecentPosts() {
        let self = this;
        WordPressAPI.getPosts(function(response) {
            if (self._isMounted) {
                self.setState({
                    mostRecentPosts: response
                }, function () {
                    this._isLoading = false;
                });
            }
        }, 3);
    }
    
    getPostAttachment(customDate) {
        let self = this;
        let postThumbnail = '';
        WordPressAPI.getPostAttachment(this.state.postData._links[`wp:featuredmedia`][0].href, function(response){
            if (self._isMounted) {
                postThumbnail = response.media_details.sizes.medium.source_url;
            }
        }).finally(function(){
            self.setState({
                postThumbnail: postThumbnail
            })
        });
    }
    
    mostRecentPosts() {
        const mostRecentPosts = this.state.mostRecentPosts;
        if(mostRecentPosts !== undefined) {
            return(
                <Col sm={4}>
                <aside className={'sidebar-site'}>
                <div className={'ultimas-postagens'}>
                <h5 className={'title'}>Mais recentes</h5>
                <Row>
                {mostRecentPosts.map((post) =>
                    <Col className={'post'} md={12} key={post.id}>
                    {/**TODO:
                        Mudar o "to=" para o link da URL antes de publicar
                    */}
                    <Link className={'title-link'} to={`/post/${post.slug}`}>
                    <Row>
                    <Col className={'post-thumbnail'} xs lg={5}>
                    {post.media.thumbnail !== undefined ? <img src={`${post.media.thumbnail}`} alt={`${post.title}`} /> : '' }
                    </Col>
                    <Col className={'post-title'} xs lg={7}>
                    <Row>
                    <Col className={'post-title'} md={12}>{`${post.title}`}</Col>
                    <Col md={12}><span className={'post-date'}>{Utils.convertDate(post.date)}</span></Col>
                    </Row>
                    </Col>
                    </Row>
                    </Link>
                    </Col>
                    )}
                    </Row>
                    </div>
                    </aside>
                    </Col>
                    ) 
                } else {
                    return(
                        <div></div>
                    )
                }
            }
            
            componentDidMount() {
                this._isMounted = true;
                console.log(this.state.postData);
                this.getMostRecentPosts();
                this.setState({
                    postslug: this.props.match.params.slug
                }, function() {
                    this.getSinglePost(this.state.postslug);
                    window.scrollTo(0, 0);
                });
            }
            
            componentDidUpdate(prevProps, prevState){
                if(this.props.match.params.slug !== prevProps.match.params.slug) {
                    this._isLoading = true;
                    this.getMostRecentPosts();
                    this.setState({
                        postslug: this.props.match.params.slug
                    }, function() {
                        this.getSinglePost(this.state.postslug)
                    });
                }
            }
            
            componentWillUnmount() {
                this._isMounted = false;
            }
            
            render() {
                let toRender = null;
                const postData = this.state.postData;

                if(postData === 'undefined' || postData.length === 0) {
                    toRender = '';
                } else {
                    toRender = <Row>
                    <Col sm={this.mostRecentPosts.length !== 0 ? 12 : 8}>
                    <article id={`post-${postData.id}`} className={`post-${postData.id} post`}>
                    <header className={'entry-header'}>
                    <h2 className={`entry-title`}>{postData.title}</h2>
                    <span className={`data-post`}>{Utils.convertDate(postData.date)}</span>
                    </header>
                    {postData.media.medium !== 'undefined' ? <div className={`post-thumbnail`}><img src={postData.media.medium} alt={postData.title}></img></div> : '' }
                    <div className={`entry-content`} dangerouslySetInnerHTML={Utils.decodeHTML(postData.content)}>
                    </div>
                    </article>
                    </Col>
                    {this.mostRecentPosts()}
                    </Row>
                }
                
                return(
                    <div className={`site-main content single-post ${this._isLoading === true ? 'loading' : '' }`}>
                    {toRender}
                    </div>
                    
                    )
                }
            }
            
            export default SinglePost;