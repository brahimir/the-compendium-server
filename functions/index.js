// Initialize Firebase Functions
const functions = require("firebase-functions");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ! Cors
var corsOptions = {
  origin: [
    "https://the-compendium.web.app",
    "https://www.the-compendium.ca",
    "https://the-compendium.ca",
    "http://localhost:1900",
  ],
};

// CORs
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED - THE COMPENDIUM DATABASE API");
  })
  .catch((err) => {
    console.log("CANNOT CONNECT - THE COMPENDIUM DATABASE API", err);
    process.exit();
  });

// ! start:: ROUTES
// * Landing route
app.get("/", (req, res) => {
  res.send("LANDING - THE COMPENDIUM SERVER");
});

// * 5e Resources
// todo

// * Homebrew Resources
// Homebrew Weapons Routes
require("./app/routes/homebrew/homebrew-weapons.routes")(app);

// Homebrew Armors Routes
require("./app/routes/homebrew/homebrew-armors.routes")(app);

// Homebrew Items Routes
require("./app/routes/homebrew/homebrew-items.routes")(app);

// Homebrew Npcs Routes
require("./app/routes/homebrew/homebrew-npcs.routes")(app);

// Homebrew Spells Routes
require("./app/routes/homebrew/homebrew-spells.routes")(app);

// * DM Tools
// Dashboard Routes
// todo

// Virtual Screen Routes
require("./app/routes/dm_tools/virtual-screen.routes")(app);

// Storyboard Routes
require("./app/routes/dm_tools/storyboard.routes")(app);

// Session Summaries Routes
require("./app/routes/dm_tools/sessions.routes")(app);

// Combat Tracker Routes
require("./app/routes/dm_tools/combat-tracker.routes")(app);

// * Auth
require("./app/routes/auth/auth.routes")(app);
// ! end:: ROUTES

// Set port, listen for requests
const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

exports.app = functions.https.onRequest(app);
