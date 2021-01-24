module.exports = app => {
    const users = require("../../controllers/auth/user.controller.js");

    var router = require("express").Router();

    // * CRUD
    // Create a new User
    router.post("/register-user", users.register);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // * AUTH
    // Retrieve a single User with email
    router.post("/auth", users.findByEmail);

    app.use('/api/users', router);
};