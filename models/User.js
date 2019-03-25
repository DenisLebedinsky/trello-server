module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      FirstName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      googleID: DataTypes.STRING
    },
    {},
  )
  User.associate = function(models) {
    // associations can be defined here
	}
  return User
}
