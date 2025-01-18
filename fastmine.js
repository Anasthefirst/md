(function() {
  ModAPI.require("player");
  ModAPI.require("network");

  // Enable instant mining
  ModAPI.addEventListener("update", () => {
    if (ModAPI.mcinstance.$thePlayer) {
      ModAPI.mcinstance.$thePlayer.capabilities.isCreativeMode = true;
      ModAPI.mcinstance.$thePlayer.capabilities.allowEdit = true;
    }
  });
})();
