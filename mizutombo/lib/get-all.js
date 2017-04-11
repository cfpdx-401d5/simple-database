const fs = require('fs');

var justRead = function getAll(dir, cb) {
  // read files in requested directory
	fs.readdir(dir, (err, files) => { // eslint-disable-line
		if (err) return cb(err);

		const dirResults = []; // eslint-disable-line
		let count // eslint-disable-line

	});
	console.log('mark end of function');
};
  
justRead('./', cb);
function cb(msg) {
	console.log('msg', msg);
}