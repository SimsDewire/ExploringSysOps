/// <reference path="typings/ue.d.ts">/>
// ; typing info for auto-completion in Visual Studio Code
/**
 * Name: main.js
 * Description: be executed at startup of the program/monitoring service 
 *				for javascript support there among plugins
 * Module.Exports
 *  - (): cleanup function
 **/


// "use strict"


// This function is called when the javascript UE library is loaded
function main() {
	var pluginManager = require('plugin-manager');
	(function testcode_for_plugins() {
		var location = {X: -230, Y: -230, Z:450};
		var rotation = {ROLL: 0, PITCH: 0, YAW: 0};
		// var plugin1 = pluginManager.Instantiate('simsdewire_sims-plugins', 0, location, rotation);
		// setTimeout(function() {
		// 	console.log(pluginManager.Destroy(plugin1));
		// }, 3000);
		// plugins.TogglePluginList(); // Show/hide pluginlist
		// plugins.List().then(function(list) {
		// 	list.forEach(function(plugin) {
		// 		plugin.Install().then(function() {
		// 			// This is for updating the list
		// 			plugins.TogglePluginList();
		// 			plugins.TogglePluginList();
		// 		});
		// 	});
		// });
	})();
	
	/**
	 * This class will maybe be used for inheritence later in plugins
	 **/
	const uclass = require('uclass')().bind(this,global)
	class ScriptHandler_S extends Blueprint.Load('/Game/BlueprintScripts/ScriptManager').GeneratedClass {
		ReceiveBeginPlay() {
			super.ReceiveBeginPlay();
			console.log("hej");
		}
		Print(params) {
			console.log("innetoa", params);
		}
		InstantiatePluginActorOverride(pluginName, pluginActor, location, rotation) {
			var returnValue = false !== pluginManager.Instantiate(pluginName, pluginActor, location, rotation);
			
			// First 4 parameters are required but has no meaning for the super-function..
			// The last paramter is a boolean, returns true if success, false if failed
			return super.InstantiatePluginActorOverride("", "", {}, {}, returnValue);
		}
		DestroyPluginActorOverride(actorPlugin) {
			var returnValue = false !== pluginManager.Destroy(actorPlugin);

			// First parameter are required but has no meaning for the super-function..
			// The last paramter is a boolean, returns true if success, false if failed
			return super.DestroyPluginActorOverride({}, returnValue);
		}
		GetAvailablePluginListOverride() {
			return super.GetAvailablePluginListOverride(pluginManager.getAvailablePluginList().map(function(plugin) {
				return plugin.packageSlug;
			}));
		}
		GetInstalledPluginListOverride() {
			var actors = pluginManager.getInstalledPluginList();
			var actorNames = [];
			for(var i in actors)
				actorNames.push(i);
			return super.GetInstalledPluginListOverride(actorNames);
		}
		GetPluginActorsOverride(slug) {
			var actors = pluginManager.GetPluginActors(slug);
			var actorNames = [];
			for(var i in actors)
				actorNames.push(i);
			return super.GetPluginActorsOverride("", actorNames);
		}
		GetPluginActorImageOverride(slug) {
			throw new Error("Not implemented: GetPluginActorImageOverride(" + slug + ")");
		}
		GetPluginActorDescriptionOverride(slug, actorName) {
			var actors = pluginManager.GetPluginActors(slug);
			if(actors != false && actorName in actors)
				return super.GetPluginActorDescriptionOverride("", "", actors[actorName].description);
			return super.GetPluginActorDescriptionOverride("", "", "");
		}
	}      
	var ScriptHandler = uclass(ScriptHandler_S);
	var sh_instance = new ScriptHandler(GWorld);
	// clean up the mess
	return function () {
		sh_instance.DestroyActor();
	}
}

// bootstrap to initiate live-reloading dev env.
try {
	module.exports = () => {
		var cleanup = null
		// wait for map to be loaded.
		process.nextTick(() => cleanup = main());

		// live-reloadable function should return its cleanup function
		return () => cleanup()
	}
}
catch (e) {
	require('bootstrap')('main')
}