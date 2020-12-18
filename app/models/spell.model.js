module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        level: Number,
        is_cantrip: Boolean,
        classes: Array,
        school: String,
        casting_time: String,
        range: String,
        duration: String,
        components: String,
        description: String,
        at_higher_levels: String,
        ratings: Array
    }, {
        timestamps: true
    });

    // ! This mongoose model names the collection in the database upon creation.
    const Spell = mongoose.model("homebrew_spell", schema);
    return Spell;
};