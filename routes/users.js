/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const jwt = require('jsonwebtoken')
const verifyToken = require('../controllers/verefyToken')
const ControllerUser = require('../controllers/controllerUser')

/* GET users listing. */
// eslint-disable-next-line func-names
router.get('/', function(req, res) {
  ControllerUser.findall(res)
})

// example for copy 
router.post('/', verifyToken, async (req, res) => {
	const user = await ControllerUser.check(req, res);
	res.send(user)
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
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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

	jwt.sign(
    { user },
    process.env.SECRETKEY,
    { expiresIn: '30d' },
    (err, token) => {
      if (err) throw err      
			const jsonData = JSON.stringify({ token });			
			res.set({ 'content-type': 'text/html; charset=utf-8' });			
			return res.send(`<script>window.opener.postMessage(${jsonData}, '*');window.close()</script>`);

    },
  )
	
		

})

passport.serializeUser(function(user, cb) {
  cb(null, user)
})
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

module.exports = router
