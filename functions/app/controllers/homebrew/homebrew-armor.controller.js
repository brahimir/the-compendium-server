const db = require("../../models");
const Armor = db.homebrewArmors;

exports.create = (req, res) => {
  // ! start:: Validate request
  // todo:: Validate other fields:

  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

  if (!req.body.armor_class) {
    res.status(400).send({
      message: "armor_class can not be empty!",
    });
    return;
  }
  // ! end:: Validate request

  // Create a Homebrew Armor
  const newArmor = new Armor({
    name: req.body.name,
    armor_category: req.body.armor_category,
    armor_class: req.body.armor_class,
    str_minimum: req.body.str_minimum,
    stealth_disadvantage: req.body.stealth_disadvantage,
    weight: req.body.weight,
    cost: req.body.cost,
    requires_attunement: req.body.requires_attunement,
    rarity: req.body.rarity,
    desc: req.body.desc,
    ratings: req.body.ratings,
  });

  // Save Homebrew Armor in the database
  newArmor
    .save(newArmor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the newArmor.",
      });
    });
};

// Retrieve all Homebrew Armors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? {
        title: {
          $regex: new RegExp(title),
          $options: "i",
        },
      }
    : {};

  Armor.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Armors.",
      });
    });
};

// Find a single Homebrew Armor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Armor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Armor with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Armor with id=" + id,
      });
    });
};

// Update a Homebrew Armor by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Armor.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Armor with id=${id}. Maybe Armor was not found!`,
        });
      } else
        res.send({
          message: "Armor was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Armor with id=" + id,
      });
    });
};

// Delete a Homebrew Armor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Armor.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Armor with id=${id}. Maybe Armor was not found!`,
        });
      } else {
        res.send({
          message: "Armor was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Armor with id=" + id,
      });
    });
};

// Delete all Homebrew Armors from the database.
exports.deleteAll = (req, res) => {
  Armor.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Armors were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Armors.",
      });
    });
};
