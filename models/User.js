module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      googleID: DataTypes.STRING
    },
    {},
  )
  User.associate = function(models) {
		User.hasMany(models.WorkPlace)
		User.hasMany(models.Board)
	}
  return User
}
