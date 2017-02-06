const net = require('net');
const server = net.createServer();

const simpleDb = require('./simple-db');
// create this variable, but we won't populate
// until someone calls "start" on the exported 
// server object
let db = null;

server.on('connection', client => {
    client.setEncoding('utf8');

    client.on('data', data => {
        // interface between request from client
        const request = JSON.parse(data);
        // and actual call to make to db libary
        if(request.method === 'save') {
            db.save(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            })
        }
        else if(request.method === 'get') {
            db.get(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            })
        }
        /* else if( ... ) */
    });
});

// export this object, which offers the "interface" into
// starting and stopping the server.
module.exports = {
    start(options, cb) {
        // go ahead and create the db
        db = simpleDb.create(options.baseDir);
        // and start the server (aka listen)
        server.listen(options.port, () => {
            cb();
        });
    },
    stop(cb) {
        // call close
        server.close(cb);
    }
};