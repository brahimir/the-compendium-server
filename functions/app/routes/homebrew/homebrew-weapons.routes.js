module.exports = app => {
    const homebrewWeapons = require("../../controllers/homebrew/homebrew-weapon.controller.js");

    var router = require("express").Router();

    // Create a new HomebrewWeapon
    router.post("/", homebrewWeapons.create);

    // Retrieve all HomebrewWeapons
    router.get("/", homebrewWeapons.findAll);

    // Retrieve a single HomebrewWeapon with id
    router.get("/:id", homebrewWeapons.findOne);

    // Update a HomebrewWeapon with id
    router.put("/:id", homebrewWeapons.update);

    // Delete a HomebrewWeapon with id
    router.delete("/:id", homebrewWeapons.delete);

    // Create a new HomebrewWeapon
    router.delete("/", homebrewWeapons.deleteAll);

    app.use('/api/homebrewWeapons', router);
};