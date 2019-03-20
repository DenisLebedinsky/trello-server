module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
		*/

    return queryInterface.bulkInsert(
      'User',
      [
        {
          FirstName: 'John Doe',
          email: 'john@mail.ru',
          password: 'defsefsef',
          salt: 'awfwafwad',
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {})
  },
}
