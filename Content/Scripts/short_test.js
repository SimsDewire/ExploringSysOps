/// <reference path="typings/ue.d.ts">/>

"use strict"

function main() {
	
	const uclass = require('uclass')().bind(this,global)
	class MySMA extends StaticMeshActor {
	  ctor() {
	    this.StaticMeshComponent.SetStaticMesh(StaticMesh.Load('/Engine/BasicShapes/Cube.Cube'))
	  }
	}      
	let MySMA_C = uclass(MySMA) 
	var a = new MySMA_C(GWorld,{Z:100});
	return function() {
		a.DestroyActor();
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
	require('bootstrap')('short_test')
}