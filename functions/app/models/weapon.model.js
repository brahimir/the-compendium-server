module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        type: String,
        is_martial: Boolean,
        damage: String,
        damage_type: String,
        requires_attunement: Boolean,
        rarity: String,
        value: String,
        properties: String,
        description: String,
        ratings: Array
    }, {
        timestamps: true
    });

    // ! This mongoose model names the collection in the database upon creation.
    const Weapon = mongoose.model("homebrew_weapon", schema);
    return Weapon;
};