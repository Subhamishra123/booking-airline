const { FlightService } = require('../services')
const logger = require('../config/logger-config')
const { ErrorResponse,SuccessResponse } = require('../utils/commons')
const { httpStatusCode } = require('httpstatuscode')
const { data, success, message, error } = require('../utils/commons/success-response')
logger.info(`inside flight controller`)
async function createFlight(request,response) {
    logger.info('inside createFlight(-) controller')
    try {
       const data = await FlightService.createFlight(request.body) 
       SuccessResponse.message='API is live'
       SuccessResponse.data=data
       return response.status(httpStatusCode.Created).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message='API is expereincing problems'
        ErrorResponse.error=error
        logger.error(`something went wrong in createFlight function ${error}`)
        return response.status(error.statusCode).json(ErrorResponse)
    }
}
async function getAllFlights(request,response)
{
    try {
        const Flights = await FlightService.getAllFlights(request.query)
        SuccessResponse.data=Flights
        return response.status(httpStatusCode.Accepted).json({
            success:true,
            message:"API is live",
            error:{},
            data:Flights
        })
    } catch (error) {
        logger.error(`something went wrong in getAllFlights function ${error}`)
        ErrorResponse.error=error
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function getFlight(request,response) {
    try {
       const Flight = await FlightService.getFlight(request.params.id)
       return response.status(httpStatusCode.Accepted).json({
        success:true,
        message:"API is live",
        error:{},
        data:Flight
       })
    } catch (error) {
    //    console.log(error.statusCode,httpStatusCode.NotFound)
        if(error.statusCode===httpStatusCode.NotFound){
           
            return response.status(httpStatusCode.NotFound).json({
                success:false,
                message:"API is having problems",
                error:error.explanation+" Flight",
                data:{}
            })
        }
        logger.error(`something went wrong in getFlight function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function updateFlight(request,response) {
    try {
        const updatedFlight = await FlightService.updateFlight(request.params.id,request.body)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:updatedFlight
        })
    } catch (error) {
        logger.error(`something went wrong in updateFlight function ${error}`)
        console.log(error.statusCode)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function deleteFlight(request,response) {
    try {
        const deletedFlight = await FlightService.deleteFlight(request.params.id)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:deletedFlight
        })
    } catch (error) {
        logger.error(`something went wrong in deleteFlight function ${error}`)
        console.log(error.statusCode)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateFlight,
    deleteFlight
}