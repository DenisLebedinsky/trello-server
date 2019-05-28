const models = require('../models')
const controller = require('./controller')

const ControllerColum = {
  create: (id, data, res) =>
    controller.createWithDependence(
      models.Board,
      id,
      'createBoard',
      { title: data.title },
      res,
    ),

  findAllforUser: (id, res) => {
    controller.findAllforParent(
      models.Board,
      models.Colums,
      'colums',
      ['title', 'id'],
      id,
      res,
    )
  },
  findbyId: (id, res) => controller.findbyId(models.Colums, id, res),

  save: (id, data, res) => controller.save(models.Colums, id, data, res),

  delete: (id, res) => controller.delete(models.Colums, id, res),
}

module.exports = ControllerColum
