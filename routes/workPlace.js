const express = require('express')
const controllerWorkPlace = require ('./controller/controllerWorkPlace');

const router = express.Router()

/* GET */
router.post('/', function(req, res) {
	controllerWorkPlace.findAllforUser(req.body.userId, res)
})

/* POST 
router.post('/', function(req, res) {
	if(req.body.userId){
		controllerWorkPlace.create(req.body.userId, req.body.name, res)
	}
})*/

module.exports = router
