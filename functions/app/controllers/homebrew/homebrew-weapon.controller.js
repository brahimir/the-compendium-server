const db = require("../../models");
const Weapon = db.homebrewWeapons;

exports.create = (req, res) => {
    // ! start:: Validate request
    /**
     * todo:: Validate other fields:
        name: String,
        type: String,
        is_martial: Boolean,
        damage: String,
        damage_type: String,
        requires_attunement: Boolean,
        rarity: String,
        value: String,
        properties: String,
        description: String,
     */
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    if (!req.body.damage) {
        res.status(400).send({
            message: "Damage can not be empty!"
        });
        return;
    }
    // ! end:: Validate request

    // Create a Homebrew Weapon
    const newWeapon = new Weapon({
        name: req.body.name,
        type: req.body.type ? req.body.type : "Unknown",
        is_martial: req.body.is_martial ? req.body.is_martial : false,
        damage: req.body.damage,
        damage_type: req.body.damage_type ? req.body.damage_type : "Unknown",
        requires_attunement: req.body.requires_attunement ? req.body.requires_attunement : false,
        rarity: req.body.rarity ? req.body.rarity : "Unknown",
        value: req.body.value ? req.body.value : "Unknown",
        properties: req.body.properties ? req.body.properties : "None",
        description: req.body.description ? req.body.description : "None",
        ratings: req.body.ratings ? req.body.ratings : [],
    });

    // Save Homebrew Weapon in the database
    newWeapon
        .save(newWeapon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the weapon."
            });
        });
};

// Retrieve all Homebrew Weapons from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : {};

    Weapon.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Weapons."
            });
        });
};

// Find a single Homebrew Weapon with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Weapon.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Weapon with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Weapon with id=" + id
                });
        });
};

// Update a Homebrew Weapon by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Weapon.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Weapon with id=${id}. Maybe Weapon was not found!`
                });
            } else res.send({
                message: "Weapon was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Weapon with id=" + id
            });
        });
};

// Delete a Homebrew Weapon with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Weapon.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Weapon with id=${id}. Maybe Weapon was not found!`
                });
            } else {
                res.send({
                    message: "Weapon was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Weapon with id=" + id
            });
        });
};

// Delete all Homebrew Weapons from the database.
exports.deleteAll = (req, res) => {
    Weapon.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Weapons were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Weapons."
            });
        });
};