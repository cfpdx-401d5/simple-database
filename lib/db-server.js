const net = require('net');
const server = net.createServer();

const createDb = require('./database');

let db = null;

server.on('connection', client => {
    client.setEncoding('utf8');

    client.on('data', data => {
        const request = JSON.parse(data);

        if(request.method === 'save') {
            db.save(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data}));
            })
        }
    })

})

module.exports = {
    start(options, cb) {
        db = createDb.create(options.baseDir);

        server.listen(options.port, () => {
            cb();
        });
    },
    stop(cb) {
        server.close(cb);
    }
}