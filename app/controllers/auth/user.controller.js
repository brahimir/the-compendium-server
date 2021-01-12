const db = require("../../models");
const User = db.users;

exports.create = (req, res) => {
  // ! start:: Validate request
  // todo:: Validate other fields:

  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }
  // ! end:: Validate request

  // Create a User
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    accessToken: req.body.accessToken,
    refreshToken: req.body.refreshToken,
    roles: req.body.roles,
    fullName: req.body.fullName,
    user_settings: req.body.user_settings,
  });

  // Save User in the database
  newUser
    .save(newUser)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the newUser.",
      });
    });
};

// Retrieve all Users from the database.
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

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found User with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: "User was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};

// AUTH - Find a single User by an email
exports.findByEmail = (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  User.find({ email: reqEmail })
    .then((data) => {
      data = data[0];

      if (!data) {
        res.status(404).send({
          status: 404,
          message: "Not found User with email " + reqEmail,
        });
      } else {
        if (reqPassword === data.password) {
          res.send(data);
        } else {
          res.status(404).send({
            status: 404,
            message: "Passwords do not match at " + reqEmail,
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        error: err,
        message: "Error retrieving User with email=" + reqEmail,
      });
    });
};
