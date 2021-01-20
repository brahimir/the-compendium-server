module.exports = app => {
    const users = require("../../controllers/auth/user.controller.js");

    var router = require("express").Router();

    // Update a storyboard User with id
    router.put("/:id", users.updateStoryboard);

    app.use('/api/users/storyboard', router);
};