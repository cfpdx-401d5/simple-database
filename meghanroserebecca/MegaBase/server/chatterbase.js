const net = require('net');

const save = require('../lib/index-dir.js');
const getDir = require('../lib/get-dir-contents.js');
const remove = require('../lib/remove-file-from-dir.js');
const update = require('../lib/update-dir.js');

let i = 1;
const clients = [];

const server = net.createServer(client => {
    const name = 'client' + (i++);
    client.setEncoding('utf-8');
    
    clients.push(client);

    client.on('data', message => {
        clients.forEach(c => {
            if(c --- client) return;
            c.write(`${name}: ${message}`);
        });
    });
    client.on('close', () => {
        const index = clients.indexOf(client);
        if(index !== -1) clients.splice(index, 1);
        console.log(`client ${name} has disconnected`);
    });
});

const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port ', port);
})
