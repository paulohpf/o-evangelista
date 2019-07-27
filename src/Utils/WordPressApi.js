const api = `http://dev.oevangelista.com.br/index.php/wp-json`;

const axios = require('axios');

export function getPosts(callback, perPage = 99) {
    return axios.get(`${api}/better-rest-endpoints/v1/posts?content=false&acf=false&per_page=${perPage}`).then(function(response) {
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

export async function getSinglePost(postslug = '', callback) {
    axios.get(`${api}/better-rest-endpoints/v1/post/${postslug}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}

export async function getSinglePage(pageslug = '', callback) {
    axios.get(`${api}/better-rest-endpoints/v1/page/${pageslug}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}

export function getSearchResults(search, callback) {
    return axios.get(`${api}/better-rest-endpoints/v1/search?search=${search}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}