const models = require('../models')
const controller = require('./controller')

const ControllerBoard = {
  create: (id, data, res) =>
    controller.createWithDependence(
      models.WorkPlace,
      id,
			'createBoard',
      { title: data.title },
      res,
    ),

  findAllforParent: (id, res) => {
    controller.findAllforParent(
      models.WorkPlace,
      models.Board,
      'board',
      ['title', 'id'],
      id,
      res,
    )
  },
  findbyId: (id, res) => controller.findbyId(models.Board, id, res),

  save: (id, data, res) => controller.save(models.Board, id, data, res),

  delete: (id, res) => controller.delete(models.Board, id, res),
}

module.exports = ControllerBoard
