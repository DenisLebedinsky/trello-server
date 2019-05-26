module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    position: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
		Task.belongsTo(models.Colums, {through: 'TaskColums'})
  };
  return Task;
};