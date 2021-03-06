const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const workRouter = require('./routes/workPlace')
const board = require('./routes/board')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/', indexRouter)
app.use('/users', cors(), usersRouter)
app.use('/workplace', cors(), workRouter)
app.use('/board', cors(), board)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
