const dbConfig = require("../config/db.config.js");

// Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// ! MongoDB url
db.url = dbConfig.url;

// * Models
// Auth
db.users = require("./auth/user.model")(mongoose);
// 5e Resources
db.homebrewWeapons = require("./5e_resources/weapon.model")(mongoose);
db.homebrewArmors = require("./5e_resources/armor.model.js")(mongoose);
db.homebrewItems = require("./5e_resources/item.model.js")(mongoose);
db.homebrewNpcs = require("./5e_resources/npc.model.js")(mongoose);
db.homebrewSpells = require("./5e_resources/spell.model.js")(mongoose);

module.exports = db;