module.exports = (sequelize, DataTypes) => {
  const Colums = sequelize.define('Colums', {
    title: DataTypes.STRING
  }, {});
  Colums.associate = function(models) {
		Colums.belongsTo(models.Board)
		Colums.hasMany(models.Task)
  };
	return Colums;
};