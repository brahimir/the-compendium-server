const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// * Collections
db.homebrewWeapons = require("./weapon.model.js")(mongoose);
db.homebrewArmors = require("./armor.model.js")(mongoose);
db.homebrewItems = require("./item.model.js")(mongoose);
db.homebrewNpcs = require("./npc.model.js")(mongoose);
db.homebrewSpells = require("./spell.model.js")(mongoose);

module.exports = db;