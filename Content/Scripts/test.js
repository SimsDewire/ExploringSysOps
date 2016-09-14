/// <reference path="typings/ue.d.ts">/>
// ; typing info for auto-completion in Visual Studio Code

"use strict"

function main() {
    // create a new actor
    // ; new ActorClass(world{World}, location{Vector}, rotation{Rotator})
    let actor = new TextRenderActor(GWorld,{X:100,Z:100},{Yaw:180})
    let text = 'Hello World'
    // initialie its text render component
    actor.TextRender.SetHorizontalAlignment('EHTA_Center')
    actor.TextRender.SetText(text)
    
    let self = this
    
    //this.setInterval(function(){self.update()},1000)

    function update(){
        console.log("update")
        actor.TextRender.AppendText('.')
        //actor.TextRender.SetText('.')
    }
    
    update()
    
    // clean up the mess
    return function () {
        actor.DestroyActor()
    }
}

// bootstrap to initiate live-reloading dev env.
try {
    module.exports = () => {
        let cleanup = null

        // wait for map to be loaded.
        process.nextTick(() => cleanup = main());
        
        // live-reloadable function should return its cleanup function
        return () => cleanup()
    }
}
catch (e) {
    require('bootstrap')('test')
}