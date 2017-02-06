const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/basic-server');

describe('echo server', () => {

    const port = 65000;

    before(done => {
        server.listen(port, () => {
            done();
        });
    });


    describe('basic client functionality', () => {
        let client = null;
        before(done => {
            client = net.connect({ port: port }, err => {
                if (err) done(err)
                else {
                    client.setEncoding('utf-8');
                    done();
                }

            });
        });



        it('says hello when client connects', done => {
            const message = 'hello';
            console.log('before');
            client.once('data', data => {

                const response = JSON.parse(data);
                console.log('after');
                console.log('first listener received', response);
                assert.equal(data, 'hello');
                done();
            });
            client.write(JSON.stringify(message));
        });

        after(done => {
            client.end();
            server.close(done);
        });
    });
});