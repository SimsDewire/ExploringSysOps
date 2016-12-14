var GameSaved = Context.GetDir('GameSaved');
function localStoragePath(key) {
	return GameSaved + 'local-storage-' + key + '.json';
}

let localStorage = {
	get: function(key) {
		let path = localStoragePath(key);
		try {
			return JSON.parse(Context.ReadStringFromFile(path));
		}
		catch(e) {
			// console.log(e.stack);
			return {};
		}
	},
	set: function (key, value) {
		let path = localStoragePath(key);
		Context.WriteStringToFile(path, JSON.stringify(value));
	}
}

module.exports = localStorage;