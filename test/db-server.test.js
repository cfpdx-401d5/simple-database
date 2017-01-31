const assert = require('assert');
const net = require('net');
const server = require('../lib/db-server');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const PORT = 65000;
const TEST_DIR = './test/test-dir-create';

describe('db server', () => {
    before(done => {
        rimraf(TEST_DIR, () => done());
    });

    before(done => {
        server.start({
            baseDir: TEST_DIR,
            port: PORT },
        () => { done();}
        );
    });

    after( done => {
        client.end(done);
        server.stop();
    });

    let client;

    before(done => {
        client = net.connect({ port: PORT }, () => {
            client.setEncoding('utf8');
            done();
        })
    });

    let saved;

    it('client saves a "file"', done => {
        const message = {
            method: 'save',
            table: 'names',
            data: {
                name: 'sam'
            }
        };
        
        client.once('data', function(data) {
            const response = JSON.parse(data);
            saved = response.data;

            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });

});