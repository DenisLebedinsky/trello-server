const models = require('../../models')


const ControllerWorkPlace = {
  create: (id, title, res) => {
    models.User.findOne({ where: { id } })
      .then(user => {
        user
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
  findAllforUser: (id, res) => {
		models.User.findOne({
      where: { id },
      include: [{ model: models.WorkPlace, attributes: ['title'] }],
    })
      .then(data => res.send(data.WorkPlaces))
      .catch(err => {
        if (err) throw err
      })
	},
	findbyId: (id, res) => {
		models.WorkPlace.findOne({ where: { id } })
      .then(data => res.send(data))
      .catch(err => {
        if (err) throw err
      })
	},
	save: (id, data, res) =>{
		models.WorkPlace.update({id}, {data})
			.then(s => {
				res.send(s.status)
			})
			 .catch(err => {
        if (err) throw err
      })
	}
}

module.exports = ControllerWorkPlace
