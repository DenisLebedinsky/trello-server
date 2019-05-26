const express = require('express')
const controllerWorkPlace = require ('../controllers/controllerWorkPlace');

const router = express.Router()

/* POST */
router.post('/create', function(req, res) {
	if(req.body.userId){
		controllerWorkPlace.create(req.body.userId, req.body.title, res)
	}else{
		res.send('no create')
	}
})

/* GET */
router.get('/', function(req, res) {
	controllerWorkPlace.findbyId(req.query.id, res)
})

/* GET */
router.get('/byUser', function(req, res) {
	controllerWorkPlace.findAllforUser(req.query.id, res)
})

/* UPDATE */
router.patch('/update', function(req, res) {
	if(req.body.id){
		controllerWorkPlace.save(req.body.id, req.body.data, res)
	}
})

/* DELETE */
router.delete('/delete', function(req, res) {
	if(req.body.userId){
		controllerWorkPlace.delete(req.body.userId, res)
	}
})

module.exports = router
