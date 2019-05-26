module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
		Board.belongsTo(models.WorkPlace)
		Board.hasMany(models.Colums)
		Board.belongsToMany(models.User, { through: 'UserBoard' })
  };
  return Board;
};