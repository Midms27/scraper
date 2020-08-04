const puppeteer = require('puppeteer');

const fs = require('fs');
const headers = ['nome','imagem','preco'];

//run scraper with item parameter from terminal
// const argv = require('yargs').argv;
// const item = argv.item;

const url1 = 'https://esportes.centauro.com.br/busca?q=';
const url2 = 'https://www.netshoes.com.br/busca?nsCat=Natural&q='
const url3 = 'https://www.amazon.com.br/s?k=';

const pesquisa = (site,busca) =>{
    switch(site) {
        case url1:
            const procura = busca.split(' ').join('%20');
            return site+procura;
            break;
        case url2:
            const procura2 = busca.split(' ').join('+');
            return site+procura2;
            break;
        case url3:
            const procura3 = busca.split(' ').join('+');
            return site+procura3;
            break;
        default:
            return 'https://www.google.com.br/';
    }
};
    
const scraper = async(item) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pesquisa(url1,item));
    const data1 = await page.evaluate(() => {
        return [...document.getElementsByClassName('product-card')].map(pro => {const {alt,src} = pro.querySelector('img') 
        return {
                src: src, 
                title: alt,
                price: undefined
            }});
    });

    await page.goto(pesquisa(url2,item));
    const data2 = await page.evaluate(() => { 
        return [...document.getElementsByClassName('item-card__images')].map(pro => {const {title,href} = pro.querySelector('a') 
         return {
            src: href, 
            title: title,
            price: document.querySelector('.full-mounted-price').innerText
        }});
    });

    await page.goto(pesquisa(url3,item));
    const data3 = await page.evaluate(() => { 
        return [...document.getElementsByClassName('s-image-square-aspect')].map(pro => {
        const {alt,src} = pro.querySelector('img') 
        return {
            src: src, 
            title: alt, 
            price: document.querySelector('.a-offscreen').innerText
        }});
    });
    const body1 = [data1.map(e => [e.title, e.src]).join('\n')];
    const body2 = [data2.map(e => [e.title, e.src, e.price]).join('\n')];
    const body3 = [data3.map(e => [e.title, e.src, e.price]).join('\n')];
    fs.writeFile('../data/data.csv',[...headers,[...body1,...body2,...body3].join('\n')],'utf8', (err) => {
        if(err){
            throw err;
        }
        console.log('scrape pronto!!')
    })
    await browser.close();
};

