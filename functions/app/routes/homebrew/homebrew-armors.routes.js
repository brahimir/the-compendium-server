module.exports = app => {
    const homebrewArmors = require("../../controllers/homebrew/homebrew-armor.controller.js");

    var router = require("express").Router();

    // Create a new HomebrewArmor
    router.post("/", homebrewArmors.create);

    // Retrieve all HomebrewArmors
    router.get("/", homebrewArmors.findAll);

    // Retrieve a single HomebrewArmor with id
    router.get("/:id", homebrewArmors.findOne);

    // Update a HomebrewArmor with id
    router.put("/:id", homebrewArmors.update);

    // Delete a HomebrewArmor with id
    router.delete("/:id", homebrewArmors.delete);

    // Delete all HomebrewArmor
    router.delete("/", homebrewArmors.deleteAll);

    app.use('/api/homebrewArmors', router);
};