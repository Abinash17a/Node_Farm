const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify=require('slugify');
const replaceTemplate=require('./modules/replaceTemplate');







// things that need to be executed once and not repeatedly
const tempOver = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');

const tempProd = fs.readFileSync('./starter/templates/product.html', 'utf-8');

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data);

//Server creation
//SERVER------------------------------

const server = http.createServer((req, res) => {
    const { query } = url.parse(req.url, true);
    const pathName = url.parse(req.url, true).pathname;
   



    if (pathName === "/") {
        res.end('This is Home');
    }
    else if (pathName === "/product") {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];

        const output = replaceTemplate(tempProd, product);

        res.end(output);
    }
    else if (pathName === "/overview") {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardshtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOver.replace('{%PRODUCTS_CARDS%}', cardshtml);
        res.end(output);
    }
    else if (pathName === "/api") {
        res.writeHead(200, { 'Content-type': 'application/json' });

        res.end(dataObj);
    }
    else {
        res.end('there is Error');
    }
});


//----------------------------------------------

//Server Listen
server.listen(8080, '127.0.0.1', () => {
    console.log('Server has been started at port 8080');
});





