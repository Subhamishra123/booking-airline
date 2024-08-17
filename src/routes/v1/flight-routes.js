const express=require('express')
const FlightRouter = express.Router()
const { FlightController } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares')
FlightRouter.post('/',FlightMiddleware.validateCreateFlightRequest,FlightController.createFlight)
module.exports={
    FlightRouter
}