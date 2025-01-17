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
  let isFastSpeed = false;

  // Toggle speed with M key
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyM') {
      isFastSpeed = !isFastSpeed;
      ModAPI.player.setSpeed({ speed: isFastSpeed ? fastSpeed : normalSpeed });
    } else if (event.code == 'KeyN') {
      // Give Feather Falling 4 boots
      ModAPI.player.addItemToInventory({ id: "minecraft:diamond_boots", enchantments: [{ id: "feather_falling", level: 4 }] });
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
