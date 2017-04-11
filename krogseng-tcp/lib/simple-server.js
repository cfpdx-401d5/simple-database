// simple tcp server for my simple database
const net = require('net');
const server = net.createServer();

const createDb = require('./create-db');

let db = null;

server.on('connection', client => {
    client.setEncoding('utf8');

    client.on('data', data => {
        const request = JSON.parse(data);

        if (request.method === 'getAll') {
            db.getAll(request.table, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            });
        } else if (request.method === 'save') {
            db.save(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            })
        } else if (request.method === 'get') {
            db.get(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            })
        } else if (request.method === 'update') {
            db.get(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            })
        } // remove here
    });
});

module.exports = {
    start(options, cb) {
        db = createDb(options.baseDir);
        server.listen(options.port, () => {
            cb();
        });
    },
    stop(cb) {
        server.close(cb);
    }
};