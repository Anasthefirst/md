(function() {
  // Disable fall damage
  ModAPI.require("player");
  ModAPI.require("network");

  ModAPI.addEventListener("update", () => {
    if (ModAPI.player.fallDistance > 2.0) {
      ModAPI.network.sendPacketPlayer({ isOnGround: true });
    }
  });

  // Toggle jumping in the air with G key
  let canJumpInAir = false;
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyG') {
      canJumpInAir = !canJumpInAir;
      console.log("Can jump in air: " + canJumpInAir);
    }
  });

  // Implement the jump with air jump toggle
  document.addEventListener('keydown', function(event) {
    if (event.code == 'Space' && ModAPI.mcinstance.$currentScreen === null) {
      if (canJumpInAir || ModAPI.mcinstance.$thePlayer.$motionY === 0) {
        ModAPI.mcinstance.$thePlayer.$motionY = 0.42; // Normal jump height in Minecraft
      }
    }
  });

})();
