const controller = {
  create: (model, data, res) => {
    model
      .create(data)
      .then(item => {
        if (item) res.sendStatus(201)
      })
      .catch(err => {
        if (err) throw err
      })
  },
  createWithDependence: (model, id, createMethod, data, res) => {
    model
      .findOne({ where: { id } })
      .then(item => {
        item[createMethod](data)
          .then(result => res.send(`craeted ${result.title}`))
          .catch(err => {
            if (err) throw err
          })
      })
      .catch(err => {
        if (err) throw err
      })
  },
  findAll: (model, res) => {
    model
      .findAll()
      .then(users => {
        res.send(users)
      })
      .catch(err => {
        if (err) throw err
      })
  },
  findAllforParent: (model, includeModel, includeName, attributes, id, res) => {
    model
      .findOne({
        where: { id },
        include: [{ model: includeModel, attributes }],
      })
      .then(result => res.send(result[includeName]))
      .catch(err => {
        if (err) throw err
      })
  },
  findbyId: (model, id, res) => {
    model
      .findById(id)
      .then(data => res.send(data))
      .catch(err => {
        if (err) throw err
      })
  },
  save: (model, id, data, res) => {
    model
      .findById(id)
      .then(item => {
				if (!item) {
					res.send(`Id = ${id} not found in workplaces`)
					return ;
				}
          item
            .update(data)
            .then(result => res.send(result))
            .catch(err => {
              if (err) throw err
            })
        
      })
      .catch(err => {
        if (err) throw err
      })
  },
  delete: (model, id, res) => {
    model
      .findById(id)
      .then(item => item.destroy())
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

module.exports = controller
