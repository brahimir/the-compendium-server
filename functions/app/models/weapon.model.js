module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: Number,
      // start:: Official Schema
      name: String,
      weapon_category: String,
      weapon_range: String,
      cost: {
        quantity: Number,
        unit: String,
      },
      damage: {
        damage_dice: String,
        damage_type: String,
      },
      range: {
        normal: Number,
        long: Number,
      },
      weight: Number,
      properties: Array,
      // end:: Official Schema
      requires_attunement: Boolean,
      rarity: String,
      desc: Array,
      ratings: Array,
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const Weapon = mongoose.model("homebrew_weapon", schema);
  return Weapon;
};
