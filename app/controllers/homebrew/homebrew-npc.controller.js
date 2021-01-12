const db = require("../../models");
const Npc = db.homebrewNpcs;

exports.create = (req, res) => {
  // ! start:: Validate request
  // todo:: Validate other fields

  // Check name field
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

  // Check armor_class field
  if (!req.body.armor_class) {
    res.status(400).send({
      message: "armor_class can not be empty!",
    });
    return;
  }
  // ! end:: Validate request

  // Create a Homebrew Npc
  const newNpc = new Npc({
    name: req.body.name,
    size: req.body.size,
    type: req.body.type,
    subtype: req.body.subtype,
    alignment: req.body.alignment,
    armor_class: req.body.armor_class,
    hit_points: req.body.hit_points,
    hit_dice: req.body.hit_dice,
    speed: req.body.speed,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma,
    proficiencies: req.body.proficiencies,
    damage_vulnerabilities: req.body.damage_vulnerabilities,
    damage_resistances: req.body.damage_resistances,
    damage_immunities: req.body.damage_immunities,
    condition_immunities: req.body.condition_immunities,
    senses: req.body.senses,
    languages: req.body.languages,
    challenge_rating: req.body.challenge_rating,
    special_abilities: req.body.special_abilities,
    actions: req.body.actions,
    legendary_actions: req.body.legendary_actions,
    ratings: req.body.ratings,
  });

  // Save Homebrew Npc in the database
  newNpc
    .save(newNpc)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Npc.",
      });
    });
};

// Retrieve all Homebrew Npcs from the database.
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

  Npc.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Npcs.",
      });
    });
};

// Find a single Homebrew Npc with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Npc.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Npc with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Npc with id=" + id,
      });
    });
};

// Update a Homebrew Npc by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Npc.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Npc with id=${id}. Maybe Npc was not found!`,
        });
      } else
        res.send({
          message: "Npc was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Npc with id=" + id,
      });
    });
};

// Delete a Homebrew Npc with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Npc.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Npc with id=${id}. Maybe Npc was not found!`,
        });
      } else {
        res.send({
          message: "Npc was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Npc with id=" + id,
      });
    });
};

// Delete all Homebrew Npcs from the database.
exports.deleteAll = (req, res) => {
  Npc.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Npcs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Npcs.",
      });
    });
};
