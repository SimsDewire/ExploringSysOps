var localStorage = require('local-storage');
function pluginOrganiser(pluginManager) {
	var instantiatedPluginActors = pluginManager.getInstantiatedPluginActors();
	var organiser = Object.assign({
		pluginActors: []
	}, localStorage.get('plugin-organiser'));
	console.log(JSON.stringify(localStorage.get('plugin-organiser')));
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
		console.log(index, JSON.stringify(actors));
		if(!actors) return [];
		var prev = -1;
		while(instantiatedPluginActors.length > 0 && prev != instantiatedPluginActors.length) {
			prev = instantiatedPluginActors.length;
			pluginManager.Destroy(instantiatedPluginActors[0].instance);
		}
		for(let i = 0; i < actors.length; i++) {
			var actor = actors[i];
			pluginManager.Instantiate(actor.meta.plugin_info, actor.meta.index, actor.location, actor.rotation);
		}
		return actors;
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
	module.exports = function(pluginManager) {
		return new pluginOrganiser(pluginManager);
	};
}