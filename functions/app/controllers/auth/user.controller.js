const db = require("../../models");
const User = db.users;

exports.register = (req, res) => {
  // ! start:: Validate request for creating new User
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "password can not be empty!",
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "email can not be empty!",
    });
    return;
  }

  if (!req.body.accessToken) {
    res.status(400).send({
      message: "accessToken can not be empty!",
    });
    return;
  }

  if (!req.body.refreshToken) {
    res.status(400).send({
      message: "refreshToken can not be empty!",
    });
    return;
  }

  if (!req.body.roles) {
    res.status(400).send({
      message: "roles can not be empty!",
    });
    return;
  }

  if (!req.body.fullName) {
    res.status(400).send({
      message: "fullName can not be empty!",
    });
    return;
  }

  if (!req.body.userSettings) {
    res.status(400).send({
      message: "userSettings can not be empty!",
    });
    return;
  }
  // ! end:: Validate request

  // * CRUD
  // Create a User
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    accessToken: req.body.accessToken,
    refreshToken: req.body.refreshToken,
    roles: req.body.roles,
    fullName: req.body.fullName,
    userSettings: req.body.userSettings,
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

// * Virtual Screen
// GET Virtual Screen
exports.getVirtualScreen = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "virtualScreen not found User with id " + id,
        });
      else {
        let userVirtualScreen = data.userSettings.virtualScreen;
        console.log(userVirtualScreen);
        res.send(userVirtualScreen);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving virtualScreen with User id=" + id,
        error: err,
      });
    });
};

// UPDATE Virtual Screen
exports.updateVirtualScreen = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "virtualScreen to update can not be empty!",
    });
  }

  const id = req.params.id;
  const body = req.body;

  console.log(body);

  User.findByIdAndUpdate(
    id,
    { $set: { "userSettings.virtualScreen": body } },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User's virtualScreen with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: "User's virtualScreen was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User's virtualScreen with id=" + id,
      });
    });
};

// * Storyboard
// todo -GET Storyboard
exports.getStoryboard = (req, res) => {
  // if (!req.body) {
  //   return res.status(400).send({
  //     message: "Storyboard to update can not be empty!",
  //   });
  // }
  // const id = req.params.id;
  // const body = req.body;
  // User.findByIdAndUpdate(
  //   id,
  //   { $set: { "userSettings.dmTools.storyboard": body } },
  //   {
  //     useFindAndModify: false,
  //   }
  // )
  //   .then((data) => {
  //     if (!data) {
  //       res.status(404).send({
  //         message: `Cannot update User's storyboard with id=${id}. Maybe User was not found!`,
  //       });
  //     } else
  //       res.send({
  //         message: "User's storyboard was updated successfully.",
  //       });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating User's storyboard with id=" + id,
  //     });
  //   });
};

// UPDATE Storyboard
exports.updateStoryboard = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Storyboard to update can not be empty!",
    });
  }

  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { "userSettings.dmTools.storyboard": body } },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User's storyboard with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: "User's storyboard was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User's storyboard with id=" + id,
      });
    });
};

// * Sessions
// UPDATE Sessions by ID
exports.updateSessions = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Session Summaries to update can not be empty!",
    });
  }

  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { "userSettings.dmTools.sessions": body } },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User's Session Summaries with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: "User's Session Summaries was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User's Session Summaries with id=" + id,
      });
    });
};

// * AUTH
// todo - Find a single User by an email
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
