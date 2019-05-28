const models = require('../models')
const controller = require('./controller')

const ControllerWorkPlace = {
  create: (id, data, res) =>
    controller.createWithDependence(
      models.User,
      id,
      'createWorkPlace',
      { title: data.title },
      res,
    ),

  findAllforParent: (id, res) => {
    controller.findAllforParent(
      models.User,
      models.WorkPlace,
      'WorkPlaces',
      ['title', 'id'],
      id,
      res,
    )
  },
  findbyId: (id, res) => controller.findbyId(models.WorkPlace, id, res),

  save: (id, data, res) => controller.save(models.WorkPlace, id, data, res),

  delete: (id, res) => controller.delete(models.WorkPlace, id, res),
}

module.exports = ControllerWorkPlace
