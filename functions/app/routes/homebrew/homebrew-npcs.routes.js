module.exports = app => {
    const homebrewNpcs = require("../../controllers/homebrew/homebrew-npc.controller.js");

    var router = require("express").Router();

    // Create a new homebrewNpc
    router.post("/", homebrewNpcs.create);

    // Retrieve all homebrewNpcs
    router.get("/", homebrewNpcs.findAll);

    // Retrieve a single homebrewNpc with id
    router.get("/:id", homebrewNpcs.findOne);

    // Update a homebrewNpc with id
    router.put("/:id", homebrewNpcs.update);

    // Delete a homebrewNpc with id
    router.delete("/:id", homebrewNpcs.delete);

    // Create a new homebrewNpc
    router.delete("/", homebrewNpcs.deleteAll);

    app.use('/api/homebrewNpcs', router);
};