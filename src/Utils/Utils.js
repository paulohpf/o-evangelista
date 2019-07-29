import axios from "axios";
import qs from 'qs';

export function convertDate(customDate) {
    let date = new Date(customDate);

    var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${date.getDate()} de ${months[(date.getMonth())]} de ${date.getFullYear()}`;
}

export function decodeHTML(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
    // return txt.value;
    return {__html: txt.value}
}

export function transformPermalink(locationOrigin, permalink){
    let to = permalink.split('/');
    return `/${to[3]}/${to[4]}`;
}

export function sendMessage(json, callback) {
    return axios.post('http://dev.oevangelista.com.br/sender.php', qs.stringify(json), {
        headers: { 
            'method': 'POST',
            'content-type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        callback(response);
    }).catch(function (error) {
        console.log(error);
    });
}