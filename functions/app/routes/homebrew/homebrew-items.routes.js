module.exports = app => {
    const homebrewItems = require("../../controllers/homebrew/homebrew-item.controller.js");

    var router = require("express").Router();

    // Create a new HomebrewItem
    router.post("/", homebrewItems.create);

    // Retrieve all HomebrewItems
    router.get("/", homebrewItems.findAll);

    // Retrieve a single HomebrewItem with id
    router.get("/:id", homebrewItems.findOne);

    // Update a HomebrewItem with id
    router.put("/:id", homebrewItems.update);

    // Delete a HomebrewItem with id
    router.delete("/:id", homebrewItems.delete);

    // Create a new HomebrewItem
    router.delete("/", homebrewItems.deleteAll);

    app.use('/api/homebrewItems', router);
};