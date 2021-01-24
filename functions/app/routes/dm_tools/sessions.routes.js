module.exports = (app) => {
  const users = require("../../controllers/auth/user.controller.js");

  var router = require("express").Router();

  // Update session summaries by User id
  router.put("/update/:id", users.updateSessions);

  app.use("/api/users/sessions", router);
};
