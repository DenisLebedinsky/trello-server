/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const jwt = require('jsonwebtoken')

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/users/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      ControllerUser.findOrCreate(profile, done)
    },
  ),
)

router.get(
  '/auth/google',
  passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/plus.login'
		],
  }),
)

router.get('/auth/google/callback', passport.authenticate('google'), (req, res,) => {

	const user = {
		FirsName:req.user.FirsName,
		email: req.user.email,
		googleID: req.user.email
	}

	res.render('close', { title: 'это окно будет закрыто', mainjs:'alert(123213)'})
/*
	jwt.sign(
		{ user },
		process.env.SECRETKEY,
		{ expiresIn: '30d' },
		(err, token) => {
			if (err) throw err
			res.json({
				token,
			})
		},
	)*/
})

passport.serializeUser(function(user, cb) {
  cb(null, user)
})
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})


// Athorization : Bearer <access_token>
//for example -- delete in next step
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
