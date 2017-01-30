const fs = require('fs');
const path = require('path');

const shortid = require('shortid');

// function dbFetch(dir) {
// 	return {
// 		getAll: function() {

// 		}
// 	}
// }

module.exports = {
	create: function(dbDir) { // exportable object
		return {
			// eslint-disable-next-line
			getAll: function(directory, cb) {
				fs.readdir(directory, (err, files) => {
					if (err) return cb(err);
					const results = [];
					let count = files.length;
					files.forEach((file, i) => {
						const fileName = path.join(directory, file);
						fs.readFile(fileName, {encoding: 'utf8'}, (err, content) => {
							if (err) return cb(err);
							results[i] = content;
							count--;
							if(!count) {
								cb(null, results);
							}
						});
					}); 
				});
			}

			// save: function(<table>, <objectToSave>, cb) {

		};
	}
};	