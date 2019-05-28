const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const models = require('./../models')
const controller = require('./controller')

const ControllerUser = {
  create: (name, email, password, res) => {
    const salt = `${Date.now()}`

    const hashPwd = crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex')

    const data = {
      FirstName: name,
      email,
      password: hashPwd,
      salt,
    }

    controller.create(models.User, data, res)
  },

  findall: res => controller.findAll(models.User, res),

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
        firstName: profile.displayName,
        googleID: profile.id,
        email: profile.emails[0].value,
      },
    }).then(([user]) => done(null, user), err => done(err, null))
  },
  check: async (req, res) => {
    const verToken = await jwt.verify(req.token, process.env.SECRETKEY)

    if (!verToken) res.sendStatus(403)

    const result = await models.User.findOne({
      where: { email: verToken.user.email },
    })

    if (!result) res.sendStatus(403)

    return result
  },
}

module.exports = ControllerUser
