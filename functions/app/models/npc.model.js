module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: String,
      // start:: Official Schema
      name: String,
      size: String,
      type: String,
      subtype: String,
      alignment: String,
      armor_class: Number,
      hit_points: Number,
      hit_dice: String,
      speed: Object,
      strength: Number,
      dexterity: Number,
      constitution: Number,
      intelligence: Number,
      wisdom: Number,
      charisma: Number,
      proficiencies: Object,
      damage_vulnerabilities: Array,
      damage_resistances: Array,
      damage_immunities: Array,
      condition_immunities: Array,
      senses: Object,
      languages: String,
      challenge_rating: Number,
      xp: Number,
      special_abilities: Array,
      actions: Array,
      legendary_actions: Array,
      // end:: Official Schema
      ratings: Array,
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const Npc = mongoose.model("homebrew_npc", schema);
  return Npc;
};
