const models = require('../models')

const ControllerWorkPlace = {
  create: (id, title, res) => {
    models.Workplace.findOne({ where: { id } })
      .then(workplace => {
        workplace
          .createWorkPlace({ title })
          .then(data => res.send(`craete ${data.title}`))
          .catch(err => {
            if (err) throw err
          })
      })
      .catch(err => {
        if (err) throw err
      })
  },
  findAllforWorkplace: (id, res) => {
    models.Workplace.findOne({
      where: { id },
      include: [{ model: models.Board, attributes: ['title', 'id'] }],
    })
      .then(data => res.send(data.Board))
      .catch(err => {
        if (err) throw err
      })
  },
  findbyId: (id, res) => {
    models.Board.findById(id)
      .then(data => res.send(data))
      .catch(err => {
        if (err) throw err
      })
  },
  save: (id, data, res) => {
    models.Board.findById(id)
      .then(board =>
        board
          .update(data)
          .then(result => res.send(result))
          .catch(err => {
            if (err) throw err
          }),
      )
      .catch(err => {
        if (err) throw err
      })
  },
  delete: (id, res) => {
    models.Board.findById(id)
      .then(board => board.destroy())
      .catch(err => {
        if (err) throw err
      })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        if (err) throw err
      })
  },
}

module.exports = ControllerWorkPlace
