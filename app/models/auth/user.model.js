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
      user_settings: {
        user_dashboard: Array,
        user_storyboard: {
          plots_main:{
            title: String,
            description: String
          },
          plots_in_progress:{
            title: String,
            description: String
          },
          plots_done:{
            title: String,
            description: String
          },
        }
      }
    },
    {
      timestamps: true,
    }
  );

  // ! This mongoose model names the collection in the database upon creation.
  const User = mongoose.model("users", schema);
  return User;
};
