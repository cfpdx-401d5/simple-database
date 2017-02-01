const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/basic-server');

const port = 65000;

describe('echo server', () => {

	before(done => {
		server.listen(port, done);
	});
});

describe('basic client functionality', () => {
	let client = null;
	before(done => {
		client = net.connect({port: port}, err => {
			if (err) done(err)
			else {
				client.setEncoding('utf-8');
				done();
			}
		});
	});

	it('says hello when client connects', done => {
		client.once('data', data => {
			console.log('first listener received', data.toString());
			assert.equal(data, 'hello');
			done();
		});
	});

	after(done => {
		server.close(done);
	});
});




