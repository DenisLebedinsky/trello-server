/* eslint-disable func-names */
const express = require('express')
const controllerBoard = require('../controllers/controllerBoard')

const router = express.Router()

/* POST */
router.post('/create', function(req, res) {
  if (req.body.id) {
    controllerBoard.create(req.body.id, req.body.data, res)
  } else {
    res.send('the userId parameter was not found')
  }
})

/* GET */
router.get('/', function(req, res) {
  if (req.query.id) {
    controllerBoard.findbyId(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* GET */
router.get('/byUser', function(req, res) {
  if (req.query.id) {
    controllerBoard.findAllforParent(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* UPDATE */
router.patch('/update', function(req, res) {
  if (req.body.id) {
    controllerBoard.save(req.body.id, req.body.data, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* DELETE */
router.delete('/delete', function(req, res) {
  if (req.query.id) {
    controllerBoard.delete(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

module.exports = router
