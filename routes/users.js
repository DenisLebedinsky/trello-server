require('dotenv').config()

/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken')

/* GET users listing. */
// eslint-disable-next-line func-names
router.get('/', function(req, res) {
  res.send('respond with a resource')
})

router.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
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
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
  }

  jwt.sign(
    { user },
    process.env.SECRETKEY,
    { expiresIn: '30d' },
    (err, token) => {
      res.json({ token })
    },
  )
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
