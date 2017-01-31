const server = require('./lib/simple-db-server');

server.listen(65000, () => {
    console.log('server is listening');
});