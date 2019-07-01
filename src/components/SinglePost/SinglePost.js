import React, { Component } from 'react';
import * as WordPressAPI from '../../Utils/WordPressApi';
import {Row, Col} from 'react-bootstrap/'
import { Link } from "react-router-dom";
import './SinglePost.scss';
import * as Utils from '../../Utils/Utils'

var _ = require('lodash');

class SinglePost extends Component {
    _isMounted = true;
    _isLoading = false;
    
    constructor(props) {
        super(props);
        
        this.state = {
            postslug: '',
            postData: [],
            postThumbnail: '',
            mostRecentPosts: []
        };
        
        this.getSinglePost = this.getSinglePost.bind(this);
        this.getPostAttachment = this.getPostAttachment.bind(this);
        this.getMostRecentPosts = this.getMostRecentPosts.bind(this);
        this.updateStateMostRecentPosts = this.updateStateMostRecentPosts.bind(this);
        this.debouncedUpdateStateMostRecentPosts = _.debounce(this.updateStateMostRecentPosts, 1500);
    }
    
    getSinglePost(postslug) {
        let self = this;
        this._isLoading = true;
        WordPressAPI.getSinglePost(postslug, function(response) {
            self.setState({
                postData: response[0]
            }, function() {
                self._isLoading = false;
                self.getPostAttachment();
            });
        })
    }
    
    getMostRecentPosts() {
        let self = this;
        let mostRecentPosts = [];
        mostRecentPosts['postsThumbnail'] = [];
        WordPressAPI.getPosts('', function(response) {
            if (self._isMounted) {
                mostRecentPosts[`postsData`] = response;
                response.map(function(post) {
                    WordPressAPI.getPostAttachment(post._links['wp:featuredmedia'][0].href, function(response) {
                        if (self._isMounted) {
                            mostRecentPosts['postsThumbnail'][`${post.id}`] = response.media_details.sizes.thumbnail.source_url;
                            self.debouncedUpdateStateMostRecentPosts(mostRecentPosts);
                        }
                    });
                });
            }
        }, 3);
    }
    
    updateStateMostRecentPosts(update) {
        this.setState({
            mostRecentPosts: update
        });
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
    
    componentDidMount() {
        this._isMounted = true;
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
        let mostRecentPosts = null;
        
        
        if(this.state.postData.length === 0) {
            toRender = '';
        } else {
            if(this.state.mostRecentPosts.postsData !== undefined) {
                mostRecentPosts = <aside className={'sidebar-site'}>
                <div className={'ultimas-postagens'}>
                <h2 className={'title'}>Mais recentes</h2>
                <Row>
                {this.state.mostRecentPosts.postsData.map((post, index) =>
                    <Col className={'post'} md={12} key={index}>
                    <Link className={'title-link'} to={`/post/${post.slug}`}>
                    <Row>
                    <Col className={'post-thumbnail'} xs lg={5}>
                    {this.state.mostRecentPosts['postsThumbnail'][`${post.id}`] !== undefined ? <img src={`${this.state.mostRecentPosts['postsThumbnail'][`${post.id}`]}`} alt={`${post.title.rendered}`} /> : '' }
                    </Col>
                    <Col className={'post-title'} xs lg={7}>
                    <Row>
                    <Col className={'post-title'} md={12}>{`${post.title.rendered}`}</Col>
                    <Col md={12}><span className={'post-date'}>{Utils.convertDate(post.date_gmt)}</span></Col>
                    </Row>
                    </Col>
                    </Row>
                    </Link>
                    </Col>
                    )}
                    </Row>
                    </div>
                    </aside>
                }
                
                
                toRender = <Row>
                <Col sm={8}>
                <article id={`post-${this.state.postData.id}`} className={`post-${this.state.postData.id} post`}>
                <header className={'entry-header'}>
                <h1 className={`entry-title`}>{this.state.postData.title.rendered}</h1>
                <span className={`data-post`}>{Utils.convertDate(this.state.postData.date_gmt)}</span>
                </header>
                {this.state.postThumbnail !== '' ? <div className={`post-thumbnail`}><img src={this.state.postThumbnail} alt={this.state.postData.title.rendered}></img></div> : '' }
                <div className={`entry-content`} dangerouslySetInnerHTML={Utils.decodeHTML(this.state.postData.content.rendered)}>
                </div>
                </article>
                </Col>
                <Col sm={4}>
                {mostRecentPosts}
                </Col>
                </Row>
            }
            
            return(
                <div className={`site-main single-post ${this._isLoading === true ? 'loading' : '' }`}>
                {toRender}
                </div>
                
                )
            }
        }
        
        export default SinglePost;