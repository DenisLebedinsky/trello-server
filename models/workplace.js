module.exports = (sequelize, DataTypes) => {
  const WorkPlace = sequelize.define('WorkPlace', {
		title: DataTypes.STRING
  }, {});
  WorkPlace.associate = function(models) {
		WorkPlace.belongsTo(models.User)
		WorkPlace.hasMany(models.Board)
  };
  return WorkPlace;
};