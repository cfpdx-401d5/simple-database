const server = require('./lib/db-server');

const PORT = 65000;
const TEST_DIR = './test/test-dir-create';

server.start({
    baseDir: TEST_DIR,
    port: PORT },
    () => { console.log(`server started on port ${PORT}`); }
);