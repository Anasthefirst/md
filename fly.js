(function() {
  // Disable fall damage
  ModAPI.require("player");
  ModAPI.require("network");

  ModAPI.addEventListener("update", () => {
    if (ModAPI.player.fallDistance > 2.0) {
      ModAPI.network.sendPacketPlayer({ isOnGround: true });
    }
  });

  // Variables for speed and jump height
  let normalSpeed = 5;
  let fastSpeed = 10;
  let slowSpeed = 2;
  let jumpHeight = 1;
  let maxJumpHeight = 5;
  let minJumpHeight = 1;

  // Adjust speed with M and N keys
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyM') {
      ModAPI.player.setSpeed({ speed: fastSpeed });
    } else if (event.code == 'KeyN') {
      ModAPI.player.setSpeed({ speed: slowSpeed });
    }
  });

  // Adjust jump height with B and V keys
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyB') {
      if (jumpHeight < maxJumpHeight) {
        jumpHeight += 1;
      }
    } else if (event.code == 'KeyV') {
      if (jumpHeight > minJumpHeight) {
        jumpHeight -= 1;
      }
    }
  });

  // Implement the jump height adjustment
  document.addEventListener('keydown', function(event) {
    if (event.code == 'Space' && ModAPI.mcinstance.$currentScreen === null) {
      if (ModAPI.mcinstance.$thePlayer.$motionY === 0) {
        ModAPI.mcinstance.$thePlayer.$motionY = jumpHeight;
      }
    }
  });

})();
