const net = require('net');
const server = net.createServer();

const createDB = require('../lib/index-dir.js');

let db = null;

server.on('connection', client => {
  client.setEncoding('utf8');

  client.on('data', data => {
      const request = JSON.parse(data);
      if(request.method === 'getAll') {
        db.getAll(request.table, (err, data) => {
          client.write(JSON.stringify({ data: data}));
          });
      }
      else if(request.method === 'getDirContentsById') {
        db.getDirContentsById(request.table, request.data, (err, data) => {
           client.write(JSON.stringify({ data: data }));
        })
      }
      else if(request.method === 'save') {
        db.save(request.table, request.data, (err, data) => {
          client.write(JSON.stringify({ data: data }));
        })
      }
      else if (request.method === 'remove') {
        db.remove(request.table, request.data, (err, data) => {
          client.write(JSON.stringify({ data: data }));
        })
      }
      else if (request.method === 'update') {
        db.update(request.table, request.data, (err, data) => {
        client.write(JSON.stringify({ data: data }));
        })
      }
  });
});

module.exports = {
  start(options, cb) {
    db = createDB(options.baseDir);
    server.listen(options.port, () => {
      cb();
    });
  },
  stop(cb) {
    server.close(cb);
  }
};     