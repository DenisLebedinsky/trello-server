module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WorkPlaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
			},
			UserId: {
				type:Sequelize.INTEGER
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
			}
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('WorkPlaces');
  }
};