module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: String,
      // start:: Official Schema
      name: String,
      armor_category: String,
      armor_class: {
        base: Number,
        dex_bonus: Boolean,
        max_bonus: Number,
      },
      str_minimum: Number,
      stealth_disadvantage: Boolean,
      weight: Number,
      cost: {
        quantity: Number,
        unit: String,
      },
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
  const Armor = mongoose.model("homebrew_armor", schema);
  return Armor;
};
