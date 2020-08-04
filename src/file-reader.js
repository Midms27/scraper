const fs = require('fs');
const { info } = require('console');

// Quando for utilizar strings que podem mudar no futuro, utilize variáveis para consumir no futuro
// Geralmente, a gente utiliza essas variáveis em arquivos de configuração, mas para o caso deste challenge
// podemos deixar aqui mesmo
const DATAPATH = path.join(__dirname, '../data/data.csv');

let rawData = null;
// Forma de exportar as funções deste arquivo para poderem ser usados em outros arquivos
module.exports = {
    readData: () => {
        if (rawData) {
            return Promise.resolve(rawData);
        }

        return new Promise((resolve, reject) => {
            fs.readFile(DATAPATH, (err, data) => {
                if (err) {
                    reject(err);
                }
                rawData = data.split('\n') //leio o texto do arquivo e cada linha vira um item no array
                    .slice(1) // ignoro o primeiro item do array que é título
                    .map(row => ({
                        nome: row[0],
                        imagem: row[1],
                        preco: parseFloat(`${row[2].replace('R$', '')}.${row[3]}`)
                    })); //transformo em um array de objetos JSON;
                resolve(rawData);
            });
        });
    }
};