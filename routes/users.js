/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const ControllerUser = require('./controller/controllerUser')

/* GET users listing. */
// eslint-disable-next-line func-names
router.get('/', function(req, res) {
  ControllerUser.findall(res)
})

// example for copy
router.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
    if (err) throw err
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'post created',
        authData,
      })
    }
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email) res.send('email is empty').status(200)

  ControllerUser.auth(email, password, res)
})

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body

  if (email && password) {
    ControllerUser.create(name, email, password, res)
  } else {
    res.sendStatus(500)
  }
})

// Athorization : Bearer <access_token>

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

module.exports = router
