const express = require('express')
const airplaneRouter = express.Router()
const { AirplaneController } = require('../../controllers')
airplaneRouter.post('/',AirplaneController.createAnAirplane)
airplaneRouter.get('/',AirplaneController.retreiveAllplanes)
airplaneRouter.get('/:id',AirplaneController.retreiveAPlane)
airplaneRouter.put('/:id',AirplaneController.updatePlane)
airplaneRouter.delete('/:id',AirplaneController.deletePlane)
module.exports=airplaneRouter