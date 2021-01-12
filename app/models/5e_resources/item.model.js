module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: String,
      // start:: Official Schema
      name: String,
      equipment_category: Object,
      gear_category: Object,
      cost: {
        quantity: Number,
        unit: String,
      },
      weight: Number,
      desc: Array,
      contents: Object,
      // end:: Official Schema
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const Item = mongoose.model("homebrew_item", schema);
  return Item;
};
