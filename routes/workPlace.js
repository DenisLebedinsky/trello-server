/* eslint-disable func-names */
const express = require('express')
const controllerWorkPlace = require('../controllers/controllerWorkPlace')
const verifyToken = require('../controllers/verefyToken')
const ControllerUser = require('../controllers/controllerUser')

const router = express.Router()

/* POST */
router.post('/create', verifyToken, async (req, res) => {
  const user = await ControllerUser.check(req, res)

  if (!user.id) res.send('the user id was not found')

  controllerWorkPlace.create(user.id, req.body.data, res)
})

/* GET */
router.get('/', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

  if (!req.query.id) res.send('the id parameter was not found')

  controllerWorkPlace.findbyId(req.query.id, res)
})

/* GET */
router.get('/byUser', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

  if (!req.query.id) res.send('the id parameter was not found')

  controllerWorkPlace.findAllforParent(req.query.id, res)
})

/* UPDATE */
router.patch('/update', verifyToken, async (req, res) => {
	await ControllerUser.check(req, res)
	
	if (!req.body.id) res.send('the id parameter was not found')
	
	controllerWorkPlace.save(req.body.id, req.body.data, res)
})

/* DELETE */
router.delete('/delete', verifyToken, async(req, res) => {
	await ControllerUser.check(req, res)

	if (!req.query.id) res.send('the id parameter was not found')
	
    controllerWorkPlace.delete(req.query.id, res)
})

module.exports = router
