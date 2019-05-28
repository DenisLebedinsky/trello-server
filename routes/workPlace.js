/* eslint-disable func-names */
const express = require('express')
const controllerWorkPlace = require('../controllers/controllerWorkPlace')

const router = express.Router()

/* POST */
router.post('/create', function(req, res) {
  if (req.body.id) {
    controllerWorkPlace.create(req.body.id, req.body.data, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* GET */
router.get('/', function(req, res) {
  if (req.query.id) {
    controllerWorkPlace.findbyId(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* GET */
router.get('/byUser', function(req, res) {
  if (req.query.id) {
    controllerWorkPlace.findAllforParent(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* UPDATE */
router.patch('/update', function(req, res) {
  if (req.body.id) {
    controllerWorkPlace.save(req.body.id, req.body.data, res)
  } else {
    res.send('the id parameter was not found')
  }
})

/* DELETE */
router.delete('/delete', function(req, res) {
  if (req.query.id) {
    controllerWorkPlace.delete(req.query.id, res)
  } else {
    res.send('the id parameter was not found')
  }
})

module.exports = router
