const api = `http://dev.oevangelista.com.br/wp-json`;

const axios = require('axios');

export function getPosts(postid = '', callback) {
    return axios.get(`${api}/wp/v2/posts/${postid}`).then(function(response) {
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