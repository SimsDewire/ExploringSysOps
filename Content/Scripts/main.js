/// <reference path="typings/ue.d.ts">/>
// ; typing info for auto-completion in Visual Studio Code
/**
 * Name: main.js
 * Description: be executed at startup of the program/monitoring service 
 *				for javascript support there among plugins
 * Module.Exports
 *  - (): cleanup function
 **/


"use strict"


// This function is called when the javascript UE library is loaded
function main() {
	(function testcode_for_plugins() {
		var plugins = require('plugin-manager');

		plugins.TogglePluginList(); // Show/hide pluginlist
		plugins.List().then(function(list) {
			list.forEach(function(plugin) {
				plugin.Install().then(function() {
					// This is for updating the list
					plugins.TogglePluginList();
					plugins.TogglePluginList();
				});
			});
		});
	})();
	
	/**
	 * This class will maybe be used for inheritence later in plugins
	 **/
	const uclass = require('uclass')().bind(this,global)
	class ScriptHandler_S extends Blueprint.Load('/Game/BlueprintScripts/ScriptManager').GeneratedClass {
		ReceiveBeginPlay() {
		}
	}      
	var ScriptHandler = uclass(ScriptHandler_S);
	
	// clean up the mess
	return function () {
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