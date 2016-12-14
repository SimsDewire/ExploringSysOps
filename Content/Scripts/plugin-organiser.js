var localStorage = require('local-storage');
function pluginOrganiser(pluginManager) {
	var instantiatedPluginActors = pluginManager.getInstantiatedPluginActors();
	var organiser = Object.assign({
		pluginActors: []
	}, localStorage.get('plugin-organiser'));

	this.saveLayout = function() {
		var actors = [];
		for(var i = 0; i < instantiatedPluginActors.length; i++) {
			var actor = instantiatedPluginActors[i];
			actors.push({
				meta: actor.meta, 
				location: actor.instance.GetActorLocation(),
				rotation: actor.instance.GetActorRotation()
			});
		};
		organiser.pluginActors.push(actors);
		localStorage.set('plugin-organiser', organiser);
	};
	this.loadLayout = function (index) {
		var actors = organiser.pluginActors[index];
		if(!actors) return [];
		for(var i = 0; i < actors.length; i++) {
			pluginManager.Instantiate(actors.meta.plugin_info, actors.meta.index, actor.location, actor.rotation);
		}
		return organiser.pluginActors[index];
	};
	this.removeLayout = function (index) {
		var actors = organiser.pluginActors[index];
		if(actors) {
			organiser.pluginActors.splice(index, 1);
			localStorage.set('plugin-organiser', organiser);
		}
	};
	this.getLayouts = function () {
		return organiser.pluginActors;
	}
};

if(typeof module == "object") {
	module.exports = pluginOrganiser;
}