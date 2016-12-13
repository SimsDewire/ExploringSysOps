const network = require('request');


module.exports = function(method, url) {
	// network('POST', GWorld.URL + 'http://192.168.1.110:3000/extern/request-values/');
	console.log(network);
	return network('POST', 'http://192.168.1.110:3000', {
		method: method,
		sourceURL: url
	});
};