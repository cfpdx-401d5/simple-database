const fs = require('fs');
const path = require('path');

const INDEX = 'index.txt';

function indexDir(directory, cb) {
	fs.readdir(directory, (err, files) => {
	  if (err) return cb(err);
	  const file = path.join(directory, INDEX);
	  const content = files.join('\n');
		fs.writeFile(file, content, err => {
			if (err) cb(err);
			else cb(null);
		});
	});
}

indexDir.indexFileName = INDEX;

module.exports = indexDir;