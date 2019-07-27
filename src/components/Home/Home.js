import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as WordPressAPI from '../../Utils/WordPressApi';
import * as Utils from '../../Utils/Utils'
import { Row, Col } from 'react-bootstrap/'
import './Home.scss';

// var _ = require('lodash');

class Home extends Component {
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
        WordPressAPI.getPosts(function (response) {
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

    featuredPost() {
        if (this.state.posts.length !== 0) {
            let featuredPost = this.state.posts[0];
            return <Col xs={12} key={featuredPost.id}>
                <div className={'post-featured'}>
                    <Link to={`/post/${featuredPost.slug}`} className={`post-thumbnail`} ><img src={`${featuredPost.media.medium}`} alt={`${featuredPost.title}`} /></Link>
                    <div className={`post-entry`}>
                        <Link to={`/post/${featuredPost.slug}`} className={`post-title`}>{featuredPost.title}</Link>
                        <div className={`post-content`} dangerouslySetInnerHTML={Utils.decodeHTML(featuredPost.excerpt)}></div>
                        <Link to={`/post/${featuredPost.slug}`} className={`post-readmore`}>Ler mais...</Link>
                    </div>
                </div>
            </Col>
        }
    }

    otherPosts() {
        if (this.state.posts.length !== 0) {
            return this.state.posts.map((post, index) =>
                index > 0 ?
                    <Col sm={4} key={post.id}>
                        {post.media.thumbnail === 'undefined' ? '' :
                            <div className={'post'}>
                                <Link to={`/post/${post.slug}`} className={`post-thumbnail`} ><img src={post.media.medium} alt={post.title} /></Link>
                            </div>}
                    </Col> : ''
            )
        }
    }

    render() {
        return (
            <div className={`site-main ${this._isLoading === true ? 'loading' : ''} `}>
                <div className={'home'}>
                    <Row>
                        {this.featuredPost()}
                        {this.otherPosts()}
                    </Row>
                </div>
            </div>
        )
    }
}

export default Home;