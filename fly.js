var newspeed = 10

var oldspeed = ModAPI.player.getSpeed()
ModAPI.addEventListener("update", function (){
//    console.log(ModAPI.player.isMoving())
    if(ModAPI.player.isMoving() == true){
        ModAPI.player.setSpeed({speed: newspeed})
    } else {
        ModAPI.player.setSpeed({speed: oldspeed})
    }
})


ModAPI.require("player"); //Require the player, we need to see their fall height.
ModAPI.require("network"); //Require the network, we need to send network packets.

ModAPI.addEventListener("update", ()=>{ // Every client tick
  if (ModAPI.player.fallDistance > 2.0) { // If the player is at a height that they can take damage from hitting the ground:
    ModAPI.network.sendPacketPlayer({isOnGround: true}); // Tell the server the player is on the ground
  }
});

let height = 0;
let maxJumpHeight = 3;
document.addEventListener('keydown', function(event) {
  if (event.code == 'Space' && ModAPI.mcinstance.$currentScreen === null) {
    if (height < maxJumpHeight) {
        ModAPI.mcinstance.$thePlayer.$motionY = 1;
        height += 1;
    } else if (ModAPI.mcinstance.$thePlayer.$isCollidedVertically === 1){
        height = 0;
    }
  }
});
