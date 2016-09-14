/// <reference path="typings/ue.d.ts">/>

"use strict"

// Blueprint class can be subclassed!
class MyActor extends Blueprint.Load('/Game/barChart').GeneratedClass {
	// constructor
    ctor() {
        // Subobject initialization, property initialization
        this.bAlwaysRelevant = true
		this.URL = '192.168.1.109:3002/test/barchart';
		this.request = require('request');
		
    }

    // declare UPROPERTY's here
    // ; this.XXXXX/*[attribute+]+type*/;
    properties() {
        this.Hello/*Replicated+EditAnywhere+int*/;
        this.World/*Replicated+EditAnywhere+Actor*/;
        this.Position/*EditAnywhere+Vector[]*/;
        this.Some/*EditAnywhere+DistanceDatum*/;
    }

    ReceiveBeginPlay() {
        super.ReceiveBeginPlay()

        console.log("barchart beginplay()")
    }
	
	/*
		Calls the url and sends the response to updateValues.
		sends either single float or array of floats to updateValues depending on response.
	*/
	getData(){
		var self = this;
		this.request("GET", this.URL)
			.then(function(res){
				//console.log(JSON.stringify(res));
			
				//	Todo: check so that we get floats, could be good
				self.updateValues(res.val);
			})
			.catch(function(res){
				console.log("network error", res)
			})
	}
 	

	/* 
		Takes an array of floats and calls super.setValues to update the graph.
		@param values Array of float to update graph with
	*/
	updateValues(values/*float*/){
		super.setValues(values)
	}
}


let MyActor_C = require('uclass')()(global,MyActor)

let _ = require('lodash')

function GetPC() {
    return GWorld.GetAllActorsOfClass(PlayerController).OutActors[0]
}


function main() {
    if (GWorld.IsServer()) {
        let actor = new MyActor_C(GWorld,{X:10})
        
        //  Set interval for actor.getData to update once every sec
        setInterval(function(){actor.getData()}, 5000)
		
        return function () {
            actor.DestroyActor()
        }
    } else {
        return function() {}
    }
}



    
try {
    module.exports = () => {
        let cleanup = null
        process.nextTick(() => cleanup = main());
        return () => cleanup()
    }
}
catch (e) {
    require('bootstrap')('barchart')
}