const assert = require('assert');
const net = require('net');
const rimraf = require('rimraf');
const path = require('path');

const server = require('../lib/db-server');

const PORT = 65000;
const DATA = './test/data';

describe('database TCP server', () => {

    before(done => {
        rimraf(DATA, () => done());
    });

    before(done => {
        server.start({
            baseDir: DATA,
            port: PORT },
            () => {done();}
        );
    });

    let client;

    before(done => {
        client = net.connect({ port: PORT }, () => {
            client.setEncoding('utf8');
            done();
        })
    });

    let saved;

    it('lets user save an object', done => {
        const message = {
            method: 'save',
            table: 'schnoodles',
            data: {
                name: 'breezy',
                type: 'schnoodle'
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            saved = response.data;
            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });
});