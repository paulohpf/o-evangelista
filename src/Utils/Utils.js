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