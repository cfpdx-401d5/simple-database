const server = require('./lib/db-server');

const PORT = 65000;
const DATA = './test/data';

server.start({
    baseDir: DATA,
    port: PORT },
    () => { console.log(`server started on port ${PORT}`); }
);