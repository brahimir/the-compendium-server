const db = require("../../models");
const Npc = db.homebrewNpcs;

exports.create = (req, res) => {
    // ! start:: Validate request
    /**
     * todo:: Validate other fields:
        name: String,
        size: String,
        alignment: String,
        alt_hit_points: String,
        speed: String,
        skills: {
            acrobatics: String,
            animal_handling: String,
            arcana: String,
            atheltics: String,
            deception: String,
            endurance: String,
            history: String,
            insight: String,
            intimidation: String,
            investigation: String,
            medicine: String,
            nature: String,
            perception: String,
            performance: String,
            persuasion: String,
            religion: String,
            sleight_of_hand: String,
            stealth: String,
            survival: String
        },
        damage_immunities: Array,
        condition_immunities: Array,
        senses: Array,
        languages: Array,
        challenge_rating: Number,
        experience: String,
        abilities: Array,
        actions: Array,
        legendary_actions: Array,
     */
    // Check name field
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!"
        });
        return;
    }

    // Check armor_class field
    if (!req.body.armor_class) {
        res.status(400).send({
            message: "armor_class can not be empty!"
        });
        return;
    }

    // Check hit_points field
    if (!req.body.hit_points) {
        res.status(400).send({
            message: "hit_points can not be empty!"
        });
        return;
    }

    // Check ability_scores field
    if (!req.body.ability_scores) {
        res.status(400).send({
            message: "ability_scores can not be empty!"
        });
        return;
    }
    // ! end:: Validate request

    // Create a Homebrew Npc
    const newNpc = new Npc({
        name: req.body.name,
        size: req.body.size ? req.body.size : null,
        alignment: req.body.alignment ? req.body.alignment : null,
        hit_points: req.body.hit_points,
        alt_hit_points: req.body.alt_hit_points ? req.body.alt_hit_points : null,
        speed: req.body.speed ? req.body.speed : null,
        ability_scores: req.body.ability_scores,
        saving_throws: req.body.saving_throws,
        skills: req.body.skills ? req.body.skills : null,
        damage_immunities: req.body.damage_immunities ? req.body.damage_immunities : null,
        condition_immunities: req.body.condition_immunities ? req.body.condition_immunities : null,
        senses: req.body.senses ? req.body.senses : null,
        languages: req.body.languages ? req.body.languages : null,
        challenge_rating: req.body.challenge_rating ? req.body.challenge_rating : null,
        experience: req.body.experience ? req.body.experience : null,
        abilities: req.body.abilities ? req.body.abilities : null,
        actions: req.body.actions ? req.body.actions : null,
        legendary_actions: req.body.legendary_actions ? req.body.legendary_actions : null,
    });

    // Save Homebrew Npc in the database
    newNpc
        .save(newNpc)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Npc."
            });
        });
};

// Retrieve all Homebrew Npcs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : {};

    Npc.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Npcs."
            });
        });
};

// Find a single Homebrew Npc with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Npc.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Npc with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Npc with id=" + id
                });
        });
};

// Update a Homebrew Npc by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Npc.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Npc with id=${id}. Maybe Npc was not found!`
                });
            } else res.send({
                message: "Npc was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Npc with id=" + id
            });
        });
};

// Delete a Homebrew Npc with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Npc.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Npc with id=${id}. Maybe Npc was not found!`
                });
            } else {
                res.send({
                    message: "Npc was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Npc with id=" + id
            });
        });
};

// Delete all Homebrew Npcs from the database.
exports.deleteAll = (req, res) => {
    Npc.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Npcs were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Npcs."
            });
        });
};