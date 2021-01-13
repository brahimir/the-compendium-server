module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      id: String,
      username: String,
      password: String,
      email: String,
      accessToken: String,
      refreshToken: String,
      roles: Array,
      fullName: String,
      userSettings: {
        dashboard: Array,
        storyboard: {
          plotsMain: {
            title: String,
            description: String,
          },
          plotsInProgress: {
            title: String,
            description: String,
          },
          plotsDone: {
            title: String,
            description: String,
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const User = mongoose.model("users", schema);
  return User;
};