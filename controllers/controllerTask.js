const models = require('../models')
const controller = require('./controller')

const ControllerTask = {
  create: (id, data, res) =>
    controller.createWithDependence(
      models.Colums,
      id,
      'createTask',
      { title: data.title },
      res,
    ),

  findAllforUser: (id, res) => {
    controller.findAllforParent(
      models.Colums,
      models.Board,
      'board',
      ['title', 'position', 'description', 'id'],
      id,
      res,
    )
  },
  findbyId: (id, res) => controller.findbyId(models.Board, id, res),

  save: (id, data, res) => controller.save(models.Board, id, data, res),

  delete: (id, res) => controller.delete(models.Board, id, res),
}

module.exports = ControllerTask
