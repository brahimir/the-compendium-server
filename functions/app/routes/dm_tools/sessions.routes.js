module.exports = (app) => {
  const users = require("../../controllers/auth/user.controller.js");

  var router = require("express").Router();

  // Get Session Summaries by User ID
  router.get("/get/:id", users.getSessions);

  // Update Session Summaries by User ID
  router.put("/update/:id", users.updateSessions);

  app.use("/api/users/sessions", router);
};
