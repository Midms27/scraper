'use strict';

// Variável que utiliza um padrão de desenvolvimento chamado Factory
// O importante, que depois que ela é chamada cria um objeto com funções que podem ser chamadas
/**
 * Ex:
 * const myService = Service();
 * 
 * para regastar todos os dados: myService.findAll()
 * para salvar: myService.save() 
*/
const Service = () => {
    const baseUrl = '/camisas';

    return {
        findAll() {
            return fetch(baseUrl)
            .then(res => res.json())
        },
        find(params) {
            // pesquisa através de parâmetros
            return fetch(baseUrl)
            .then(res => res.json())
        },
        save(values) {
            // TODO formulário para salvar novos itens
            // Seria necessário utilizar o método POST para fazer salvamentos
        }
    }
}

function render(data) {
    // TODO função para desenhar no HTML conteúdo recebido como parâmetro
}

// const fetch = require('node-fetch'); // Isso é Node.js, não roda no browser deve ser removido
// Fetch API é um recurso nativo nos browsers
window.addEventListener('DOMContentLoaded', () => {
    const appService = Service();
    
    appService.findAll()
        .then(res => {
            console.log(res);
            // Preencher no HTML os dados para visualizar
            render(res);
        });

    const searchField = document.getElementById('search-field');
    const buttonSearch = document.getElementById('search-button');

    buttonSearch.addEventListener('click', (evt) => {
        evt.preventDefault();
        appService.find({
            value: searchField.value
        }).then(res => {
            console.log(res);
            // após implementado é fazer algo similar ao anterior
            render(res);
        })
    });
});
