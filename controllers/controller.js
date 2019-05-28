const controller = {
  create: async (model, data, res) => {
    const result = model.create(data)

    if (!result) res.send('Error: not created')

    res.sendStatus(201)
  },

  createWithDependence: async (model, id, createMethod, data, res) => {
    const parent = await model.findOne({ where: { id } })

    if (!parent) res.send('Error: Record by id was not found!')

    const result = await parent[createMethod](data)

    if (!result) res.send('Error: Record was not created')

    res.send(`Craeted ${result.title}`)
  },

  findAll: async (model, res) => {
    const result = await model.findAll()

    if (!result) res.send('Error: Records was not found')

    res.send(result)
  },

  findAllforParent: async (
    model,
    includeModel,
    includeName,
    attributes,
    id,
    res,
  ) => {
    const result = await model.findOne({
      where: { id },
      include: [{ model: includeModel, attributes }],
    })

    if (!result) res.send('Error: Records was not found')

    res.send(result[includeName])
  },

  findbyId: async (model, id, res) => {
    const result = await model.findById(id)

    if (!result) res.send('Error: Records was not found')

    res.send(result)
  },

  save: async (model, id, data, res) => {
    const item = await model.findById(id)

    if (!item) res.send(`Record id = ${id} not found`)

    const result = await item.update(data)

    if (!result) res.send(`Error: id = ${id} was not update`)

    res.send(`Record was update`)
  },

  delete: async (model, id, res) => {
    const item = await model.findById(id)

    if (!item) res.send(`Record with id = ${id} not found`)

    const result = await item.destroy()

    if (!result) res.send(`Error: id = ${id} was not deleted`)

    res.send('Record was deleted')
  },
}

module.exports = controller
