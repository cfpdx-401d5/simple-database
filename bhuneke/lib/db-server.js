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
                client.write(JSON.stringify({data: data}));
            })
        } 
        else if (request.method === 'update') {
            db.update(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({data: data}));
            });
        }
        else if (request.method === 'remove') {
            db.remove(request.table, request.data._id, (err, data) => {
                client.write(JSON.stringify({data: data}))
            });
        } 
        else if (request.method === 'get') {
            db.get(request.table, request.data._id, (err, data) => {
                client.write(JSON.stringify({data: data}))
            });
        }
        else if (request.method === 'getAll') {
            db.getAll(request.directory, (err, contents) => {
                client.write(JSON.stringify({data: contents}))
            });
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