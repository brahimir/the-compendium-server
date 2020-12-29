module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: Number,
      // start:: Official Schema
      name: String,
      desc: String,
      higher_level: String,
      range: String,
      components: Array,
      material: String,
      ritual: Boolean,
      duration: String,
      concentration: Boolean,
      casting_time: String,
      level: Number,
      attack_type: String,
      damage: {
        damage_type: Object,
        damage_at_slot_level: Object,
      },
      school: Object,
      classes: Array,
      subclasses: Array,
      // end:: Official Schema
      ratings: Array,
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const Spell = mongoose.model("homebrew_spell", schema);
  return Spell;
};
