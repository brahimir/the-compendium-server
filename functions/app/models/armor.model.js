module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        type: String,
        armor_class: String,
        stealth_disadvantage: Boolean,
        strength_requirement: String,
        requires_attunement: Boolean,
        rarity: String,
        value: String,
        description: String,
        ratings: Array
    }, {
        timestamps: true
    });

    // ! This mongoose model names the collection in the database upon creation.
    const Armor = mongoose.model("homebrew_armor", schema);
    return Armor;
};