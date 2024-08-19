const express=require('express')
const FlightRouter = express.Router()
const { FlightController } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares')
FlightRouter.post('/',FlightMiddleware.validateCreateFlightRequest,FlightController.createFlight)
FlightRouter.get('/',FlightController.getAllFlights)
module.exports={
    FlightRouter
}