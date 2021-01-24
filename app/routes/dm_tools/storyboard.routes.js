module.exports = (app) => {
  const users = require("../../controllers/auth/user.controller.js");

  var router = require("express").Router();

  // * CRUD
  // GET a User's Storyboard by ID
  router.get("/get/:id", users.getStoryboard);

  // UPDATE a User's Storyboard by ID
  router.put("/update/:id", users.updateStoryboard);

  app.use("/api/users/storyboard", router);
};
