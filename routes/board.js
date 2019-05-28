/* eslint-disable func-names */
const express = require('express')
const controllerBoard = require('../controllers/controllerBoard')
const verifyToken = require('../controllers/verefyToken')
const ControllerUser = require('../controllers/controllerUser')

const router = express.Router()

/* POST */
router.post('/create', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

  if (!req.body.id) res.send('the userId parameter was not found')

  controllerBoard.create(req.body.id, req.body.data, res)
})

/* GET */
router.get('/', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

  if (!req.query.id) res.send('the id parameter was not found')

  controllerBoard.findbyId(req.query.id, res)
})

/* GET */
router.get('/byUser', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

  if (!req.query.id) res.send('the id parameter was not found')

  controllerBoard.findAllforParent(req.query.id, res)
})

/* UPDATE */
router.patch('/update', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

	if (!req.body.id) res.send('the id parameter was not found')
	
  controllerBoard.save(req.body.id, req.body.data, res)
})

/* DELETE */
router.delete('/delete', verifyToken, async (req, res) => {
  await ControllerUser.check(req, res)

	if (!req.query.id) res.send('the id parameter was not found')
	
  controllerBoard.delete(req.query.id, res)
})

module.exports = router
