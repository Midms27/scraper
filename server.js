const { request } = require('http');
const fastify = require('fastify')({logger: true});
const path = require('path');
const { readData } = require('./src/file-reader');

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'page'),
});

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html') 
});

fastify.get('/data/json', (req, reply) => {
    reply.sendFile('data.json', path.join(__dirname, 'data'));
});


fastify.listen(8000, (err) => {
    if (err){
        console.log(err);
        process.exit(1);
    } else {
        console.log('server running on port 8000...');
    }
});
