module.exports = app => {
    const homebrewSpells = require("../../controllers/homebrew/homebrew-spell.controller.js");

    var router = require("express").Router();

    // Create a new homebrewSpell
    router.post("/", homebrewSpells.create);

    // Retrieve all homebrewSpells
    router.get("/", homebrewSpells.findAll);

    // Retrieve a single homebrewSpell with id
    router.get("/:id", homebrewSpells.findOne);

    // Update a homebrewSpell with id
    router.put("/:id", homebrewSpells.update);

    // Delete a homebrewSpell with id
    router.delete("/:id", homebrewSpells.delete);

    // Create a new homebrewSpell
    router.delete("/", homebrewSpells.deleteAll);

    app.use('/api/homebrewSpells', router);
};