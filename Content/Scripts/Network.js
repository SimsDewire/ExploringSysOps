const network = require('request');

function request(method, url) {
	// network('POST', GWorld.URL + 'http://192.168.1.110:3000/extern/request-values/');
	// console.log(network);
	var tmp = url.split('://', 2);
	if(tmp.length < 2) {
		// throw "You have to specify the protocol, example: http://your-url.com";
		tmp = ['', url];
	} else tmp[0] += '://';
	var protocol = tmp[0];
	var firstColon = tmp[1].indexOf(':');
	var firstSlash = tmp[1].indexOf('/');
	var sourceURL = tmp[1].substring(0, (firstColon > -1 ? firstColon : firstSlash));
	var port = (firstColon > -1 ? tmp[1].substring(firstColon+1, firstSlash) : '80');
	var path = tmp[1].substring(firstSlash);
	return network('POST', GWorld.ServerIP + '/extern/request-values/', {
		data: {
			method: method,
			sourceURL: protocol + sourceURL,
			port: port,
			path: path
		}
	});
};

if(typeof GWorld == "object")
	GWorld.Network = request;
if(typeof module == "object")
	module.exports = request;