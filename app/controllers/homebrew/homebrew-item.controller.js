const db = require("../../models");
const Item = db.homebrewItems;

exports.create = (req, res) => {
    // ! start:: Validate request
    /**
     * todo:: Validate other fields:
        type: String,
        requires_attunement: Boolean,
        rarity: String,
        value: String,
        description: String,
     */
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    // ! end:: Validate request

    // Create a Homebrew Item
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type ? req.body.type : "Unknown",
        requires_attunement: req.body.is_martial ? req.body.is_martial : false,
        rarity: req.body.rarity ? req.body.rarity : "Unknown",
        value: req.body.value ? req.body.value : "Unknown",
        properties: req.body.properties ? req.body.properties : "None",
        description: req.body.description ? req.body.description : "None",
        ratings: req.body.ratings ? req.body.ratings : [],
    });

    // Save Homebrew Item in the database
    newItem
        .save(newItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Item."
            });
        });
};

// Retrieve all Homebrew Items from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : {};

    Item.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Items."
            });
        });
};

// Find a single Homebrew Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Item with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Item with id=" + id
                });
        });
};

// Update a Homebrew Item by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found!`
                });
            } else res.send({
                message: "Item was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};

// Delete a Homebrew Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Item.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            } else {
                res.send({
                    message: "Item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};

// Delete all Homebrew Items from the database.
exports.deleteAll = (req, res) => {
    Item.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Items were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Items."
            });
        });
};