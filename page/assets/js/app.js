'use strict';


function render(data) {
    data.forEach(info => {
    const HTMLDiv = document.getElementById('info')
    const div = document.createElement('div');
    HTMLDiv.appendChild(div);
    div.innerHTML = `<img src='${info.imagem}' alt='Product image'/></br><p>${info.nome}</p></br><p>${info.preco},${info.field4}</p>`;
})}    


window.addEventListener('DOMContentLoaded', () => {

    const searchField = document.getElementById('search-field');
    const buttonSearch = document.getElementById('search-button');
    
    const dataURL = 'http://localhost:8000/data/json';

    const getData = () => fetch(dataURL).then(res => res.json()).then(data => render(data));
    getData()

    buttonSearch.addEventListener('click', (evt) => {
        evt.preventDefault();
    });
});
