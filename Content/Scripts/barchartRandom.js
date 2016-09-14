/// <reference path="typings/ue.d.ts">/>

"use strict"

// Blueprint class can be subclassed!
class MyActor extends Blueprint.Load('/Game/barChart').GeneratedClass {
    // constructor
    ctor() {
        // Subobject initialization, property initialization
        this.bAlwaysRelevant = true
    }

    // declare UPROPERTY's here
    // ; this.XXXXX/*[attribute+]+type*/;
    properties() {
        this.Hello/*Replicated+EditAnywhere+int*/;
        this.World/*Replicated+EditAnywhere+Actor*/;
        this.Position/*EditAnywhere+Vector[]*/;
        this.Some/*EditAnywhere+DistanceDatum*/;
    }
	
	

    // Overriding function doesn't need function signature
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay()

        console.log("barchart beginplay()")
    }
	
	updateValue(value){
		console.log("in set value")
		super.setValue(value)
	}
	
	/* Takes an array of values and passes them to super.SetValues
		@param values Array of float values
	*/
	updateValues(values){
		
		console.log("in update values");
		super.setValues(values)
	}
    
    //Tick(){
        //console.log("ticking")
        //super.Update()
        /*  Remake this into sequence and call with params.
            Change in blueprint so that it calls update with a  fuction*/
        
   // }

    // New UFUNCTION needs proper function signature
    // ; function-name(arg/*type*/,...) /*UFUNCTION-flag[+another flag]*/
    NewFunction(x/*int*/,y/*int*/) /*NetMulticast*/ {
        console.log(x+y);
    }
}


let MyActor_C = require('uclass')()(global,MyActor)

let _ = require('lodash')

function GetPC() {
    return GWorld.GetAllActorsOfClass(PlayerController).OutActors[0]
}


function main() {
    if (GWorld.IsServer()) {
        let actor = new MyActor_C(GWorld,{Y:100})
        
        //  Set interval for actor.update to update once every sec
		//		Randomly passes number between 1 and 10 as value
        setInterval(function(){actor.updateValues(dummyArray())}, 1000)
		
		//actor.updateValue(10.5)
		
        return function () {
            actor.DestroyActor()
            
        }
    } else {
        return function() {}
    }
}

function dummyArray(){
	return new Array(5).map(function(){return Math.floor((Math.random() * 10) + 1)})
}

    
try {
    module.exports = () => {
        let cleanup = null
        process.nextTick(() => cleanup = main());
        return () => cleanup()
    }
}
catch (e) {
    require('bootstrap')('barchartRandom')
}