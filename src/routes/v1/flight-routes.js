const express=require('express')
const FlightRouter = express.Router()
const { FlightController } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares')
FlightRouter.post('/',FlightMiddleware.validateCreateFlightRequest,FlightController.createFlight)
FlightRouter.get('/',FlightController.getAllFlights)
FlightRouter.get('/:id',FlightController.getFlight)
FlightRouter.patch('/:id/seats',FlightMiddleware.validateupdateSeatsRequest,FlightController.updateSeats)

module.exports={
    FlightRouter
}