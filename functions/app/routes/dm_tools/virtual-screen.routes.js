module.exports = (app) => {
  const users = require("../../controllers/auth/user.controller.js");

  var router = require("express").Router();

  // * CRUD
  // Get a User's Virtual Screen by ID
  router.get("/get/:id", users.getVirtualScreen);

  // Update a User's Virtual Screen by ID
  router.put("/update/:id", users.updateVirtualScreen);

  app.use("/api/users/virtual-screen", router);
};
