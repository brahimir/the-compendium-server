module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        size: String,
        alignment: String,
        armor_class: Number,
        hit_points: Number,
        alt_hit_points: String,
        speed: Array,
        ability_scores: {
            STR: String,
            DEX: String,
            CON: String,
            INT: String,
            WIS: String,
            CHA: String
        },
        saving_throws: {
            STR: String,
            DEX: String,
            CON: String,
            INT: String,
            WIS: String,
            CHA: String
        },
        skills: {
            acrobatics: String,
            animal_handling: String,
            arcana: String,
            atheltics: String,
            deception: String,
            endurance: String,
            history: String,
            insight: String,
            intimidation: String,
            investigation: String,
            medicine: String,
            nature: String,
            perception: String,
            performance: String,
            persuasion: String,
            religion: String,
            sleight_of_hand: String,
            stealth: String,
            survival: String
        },
        damage_immunities: Array,
        condition_immunities: Array,
        senses: Array,
        languages: Array,
        challenge_rating: Number,
        experience: String,
        abilities: Array,
        actions: Array,
        legendary_actions: Array,
        ratings: Array
    }, {
        timestamps: true
    });

    // ! This mongoose model names the collection in the database upon creation.
    const Npc = mongoose.model("homebrew_npc", schema);
    return Npc;
};