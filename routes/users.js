require('dotenv').config()
const CryptoJS = require('crypto-js')
/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/User')

/* GET users listing. */
// eslint-disable-next-line func-names
router.get('/', function(req, res) {
  res.send('respond with a resource')
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
      if (err) throw err
      res.json({ token })
    },
  )
})

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  const salt = `${Date.now()}`

  if (email && password) {
    const hashPwd = CryptoJS.PBKDF2(password, process.env.SECRETKEY, salt, {
      keySize: 128 / 32,
    })

    User.create({
      name,
      email,
      password: hashPwd,
      salt,
    }).then(data => {
      console.log('user created: ', data.id)
      console.log('user password', data.password)
    })

    res.sendStatus(201)
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
