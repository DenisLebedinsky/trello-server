const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const models = require('./../../models')

const ControllerUser = {
  create: (name, email, password, res) => {
    const salt = `${Date.now()}`

    const hashPwd = crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex')

    models.User.create({
      FirstName: name,
      email,
      password: hashPwd,
      salt,
    })
      .then(user => {
        if (user) res.sendStatus(201)
      })
      .catch(err => {
        if (err) {
          res.send('is duplicate email')
          res.Status(200)
        }
      })
  },

  findall: res => {
    models.User.findAll().then(users => {
      res.send(users)
    })
  },

  auth: (_email, password, res) => {
    models.User.findOne({ where: { email: _email } }).then(user => {
      if (user) {
        const hashPwd = crypto
          .createHmac('sha1', user.salt)
          .update(password)
          .digest('hex')

        if (user.password === hashPwd) {
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
          )
        } else res.send('Errors auth').status(500)
      } else {
        res.send('Errors auth').status(500)
      }
    })
  },
	findOrCreate: (profile, done) => {
		models.User.findOrCreate({
      where: { googleID: profile.id },
      defaults: {
        FirstName: profile.displayName,
        googleID: profile.id,
				email: profile.emails[0].value
      },
    }).then(([user]) => done(null, user), err => done(err, null))
	},
  
}

module.exports = ControllerUser
