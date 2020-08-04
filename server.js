const { request } = require('http');
const fastify = require('fastify')({logger: true});
const path = require('path');
const { readData } = require('./src/file-reader');

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'page'),
  })


fastify.get('/', function (req, reply) {
    reply.sendFile('index.html') 
});

// Rota de pesquisa das camisas
fastify.get('/camisas', (req, res) => {
  readData().then(data => {
    const precos = data.map(el => el.preco);
    res.send({
      data,
      max: Math.max(...precos),
      min: Math.min(...precos),
      count: data.length
    });
  })
  .catch(err => {
    res.status(500);
  });
});


fastify.listen(8000, (err) => {
    if (err){
        console.log(err);
        process.exit(1);
    } else {
        console.log('server running on port 8000...');
    }
});
