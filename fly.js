(function() {
  // Disable fall damage
  ModAPI.require("player");
  ModAPI.require("network");

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

  // Implement flying mechanics
  let canFly = false;
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyF') {
      canFly = !canFly;
      console.log("Can fly: " + canFly);
    }
  });

  document.addEventListener('keydown', function(event) {
    if (canFly) {
      if (event.code == 'Space') { // Fly up
        ModAPI.mcinstance.$thePlayer.$motionY = 0.42;
      }
      if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') { // Fly down
        ModAPI.mcinstance.$thePlayer.$motionY = -0.42;
      }
    }
  });

  // Stop vertical motion when keys are released
  document.addEventListener('keyup', function(event) {
    if (canFly && (event.code == 'Space' || event.code == 'ShiftLeft' || event.code == 'ShiftRight')) {
      ModAPI.mcinstance.$thePlayer.$motionY = 0;
    }
  });

})();
