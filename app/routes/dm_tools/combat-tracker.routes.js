module.exports = (app) => {
  const users = require("../../controllers/auth/user.controller.js");

  var router = require("express").Router();

  // * CRUD
  // Get a User's Combat Tracker by ID
  router.get("/get/:id", users.getCombatTracker);

  // Update a User's Combat Tracker by ID
  router.put("/update/:id", users.updateCombatTracker);

  app.use("/api/users/combat-tracker", router);
};
