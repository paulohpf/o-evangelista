const api = `http://dev.oevangelista.com.br/wp-json`;

const axios = require('axios');

export function getPosts(postid = '', callback, perPage = 9) {
    return axios.get(`${api}/wp/v2/posts/${postid}/?per_page=${perPage}`).then(function(response) {
        callback(response.data)
    }).catch(function(error) {
        console.error(error);
    });
}

//Capturo a imagem do post
export function getPostAttachment(attachmentHref, callback) {
    return axios.get(`${attachmentHref}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}

export function getSinglePost(postslug = '', callback) {
    axios.get(`${api}/wp/v2/posts?slug=${postslug}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}

export function getSearchResults(search, callback) {
    axios.get(`${api}/wp/v2/posts?search=${search}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}