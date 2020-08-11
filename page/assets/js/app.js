'use strict';
let productData = [];
const dataURL = 'http://localhost:8000/data/json';

function render(data) {
    data.forEach(info => {
    const HTMLDiv = document.getElementById('info')
    const div = document.createElement('div');
    HTMLDiv.appendChild(div);
    div.innerHTML = `<img src='${info.imagem}' alt='Product image'/></br><p>${info.nome}</p></br><p>${info.preco},${info.field4}</p>`;
})} 

function clear() {
    const HTMLDiv = document.getElementById('info');
    HTMLDiv.innerHTML = '';
}

function noResults() {
    const HTMLDiv = document.getElementById('info');
    HTMLDiv.innerHTML = '<h2>Sem resultados</h2>'
}

const loadData = async () => {
    try {
        const res = await fetch(dataURL);
        productData = await res.json();
        render(productData);
    } catch (err) {
        console.error(err);
    }
};

if (document.readyState !== 'loading') {
    console.log('Ready')
    const searchField = document.querySelector('input');
    const alfaBox = document.getElementById('alfa');
    const maiorBox = document.getElementById('maior');
    const menorBox = document.getElementById('menor');

    searchField.addEventListener('keyup', (evt) => {
        clear()
        evt.preventDefault();
        const searchValue = searchField.value.toLowerCase()
        const filteredData = productData.filter((pro) => {
            return pro.nome.toLowerCase().includes(searchValue)
        })
        render(filteredData);
    });

    loadData();

} else{
    window.addEventListener('DOMContentLoaded', () => {  
    console.log('Ready')

    const searchField = document.querySelector('input');
    const alfaBox = document.querySelector("input[name=A-Z]");
    const maiorBox = document.querySelector("input[name=maior-menor]");
    const menorBox = document.querySelector("input[name=menor-maior]");

    searchField.addEventListener('keyup', (evt) => {
        evt.preventDefault();
        clear()
        const searchValue = searchField.value
        const filteredData = productData.filter((pro) => {
            return pro.nome.toLowerCase().includes(searchValue)
        })
        render(filteredData);
    });

    alfaBox.addEventListener('change', (e) => {
        clear();
        render(productData.sort((a,b) => {return a.nome - b.nome}))
    })

    menorBox.addEventListener('change', (e) => {
  
    })

    maiorBox.addEventListener('change', (e) => {
   
    })

    loadData()

});
}
