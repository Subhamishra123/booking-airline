const express=require('express')
const airportRouter=express.Router()
const { AirportController } = require('../../controllers')
const { AirportMiddleware } = require('../../middlewares')
airportRouter.post('/',AirportMiddleware.validateCreateAirportRequest,AirportController.createAirport)
airportRouter.get('/',AirportController.getAllAirports)
airportRouter.get('/:id',AirportController.getAirport)
airportRouter.patch('/:id',AirportController.updateAirport)
airportRouter.delete('/:id',AirportController.deleteAirport)
module.exports={
    airportRouter
}