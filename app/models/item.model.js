module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        type: String,
        requires_attunement: Boolean,
        rarity: String,
        value: String,
        description: String,
        ratings: Array
    }, {
        timestamps: true
    });

    // ! This mongoose model names the collection in the database upon creation.
    const Item = mongoose.model("homebrew_item", schema);
    return Item;
};