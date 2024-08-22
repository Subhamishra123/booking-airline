const { httpStatusCode } = require('httpstatuscode')
const  AppError  = require('../utils/errors/AppError')
const { ErrorResponse } =require('../utils/commons')
const logger = require('../config/logger-config')
function validateCreateFlightRequest(request,response,next)
{
    logger.info('inside validateCreateFlightRequest')
    ErrorResponse.message="something went wrong while creating flight"
    logger.info(`${JSON.stringify(request.body)}`)
    const {flightNumber,airplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats} = request.body
    
    if(flightNumber==undefined)
    {
        ErrorResponse.error=new AppError(["flightNumber not entered"],httpStatusCode.BadRequest)
        logger.error('flightNumber not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(airplaneId==undefined)
    {
        ErrorResponse.error=new AppError(["airplaneId not entered"],httpStatusCode.BadRequest)
        logger.error('airplaneId not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(departureAirportId==undefined)
    {
        ErrorResponse.error=new AppError(["departureAirportId not entered"],httpStatusCode.BadRequest)
        logger.error('departureAirportId not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(arrivalAirportId==undefined)
    {
        ErrorResponse.error=new AppError(["arrivalAirportId not entered"],httpStatusCode.BadRequest)
        logger.error('arrivalAirportId not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(arrivalTime==undefined)
    {
        ErrorResponse.error=new AppError(["arrivalTime not entered"],httpStatusCode.BadRequest)
        logger.error('arrivalTime not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(departureTime==undefined)
    {
        ErrorResponse.error=new AppError(["departureTime not entered"],httpStatusCode.BadRequest)
        logger.error('departureTime not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(price==undefined)
    {
        ErrorResponse.error=new AppError(["price not entered"],httpStatusCode.BadRequest)
        logger.error('price not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(totalSeats==undefined)
    {
        ErrorResponse.error=new AppError(["totalSeats not entered"],httpStatusCode.BadRequest)
        logger.error('totalSeats not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }

    
    next()
}

function validateupdateSeatsRequest(request,response,next)
{
    if(!request.body.seats)
    {
        ErrorResponse.error=new AppError(["seats not entered"],httpStatusCode.BadRequest)
        logger.error('seats not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(!request.body.dec)
    {
        ErrorResponse.error=new AppError(["dec not entered"],httpStatusCode.BadRequest)
        logger.error('dec not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    next()
}

module.exports={
    validateCreateFlightRequest,
    validateupdateSeatsRequest
}
