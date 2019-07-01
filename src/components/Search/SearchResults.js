import React, { Component } from 'react';

class SinglePost extends Component {

    componentDidMount() {
        // let query = queryString.parse(this.props.location.search)
        console.log(this.props.location.search);
    }
    
    render(){
        return(
            <div></div>
            )
        }
    }
    
    export default SinglePost;