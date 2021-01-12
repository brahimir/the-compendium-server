const db = require("../../models");
const Spell = db.homebrewSpells;

exports.create = (req, res) => {
  // ! start:: Validate request
  // todo - validate other fields.
  
  // Check name field
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }
  // ! end:: Validate request

  // Create a Homebrew Spell
  const newSpell = new Spell({
    name: req.body.name,
    desc: req.body.desc,
    higher_level: req.body.higher_level,
    range: req.body.range,
    components: req.body.components,
    material: req.body.material,
    ritual: req.body.ritual,
    duration: req.body.duration,
    concentration: req.body.concentration,
    casting_time: req.body.casting_time,
    level: req.body.level,
    attack_type: req.body.attack_type,
    damage: req.body.damage,
    school: req.body.school,
    classes: req.body.classes,
    subclasses: req.body.subclasses,
    ratings: req.body.ratings,
  });

  // Save Homebrew Spell in the database
  newSpell
    .save(newSpell)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Spell.",
      });
    });
};

// Retrieve all Homebrew Spells from the database.
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

  Spell.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Spells.",
      });
    });
};

// Find a single Homebrew Spell with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Spell.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Spell with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Spell with id=" + id,
      });
    });
};

// Update a Homebrew Spell by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Spell.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Spell with id=${id}. Maybe Spell was not found!`,
        });
      } else
        res.send({
          message: "Spell was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Spell with id=" + id,
      });
    });
};

// Delete a Homebrew Spell with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Spell.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Spell with id=${id}. Maybe Spell was not found!`,
        });
      } else {
        res.send({
          message: "Spell was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Spell with id=" + id,
      });
    });
};

// Delete all Homebrew Spells from the database.
exports.deleteAll = (req, res) => {
  Spell.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Spells were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Spells.",
      });
    });
};
