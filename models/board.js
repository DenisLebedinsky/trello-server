module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
		Board.belongsTo(models.WorkPlace)
		Board.BelongsToMany(models.User)
		Board.hasMany(models.Colums)
  };
  return Board;
};