const { airportService } = require('../services')
const logger = require('../config/logger-config')
const { ErrorResponse,SuccessResponse } = require('../utils/commons')
const { httpStatusCode } = require('httpstatuscode')
const { data, success, message, error } = require('../utils/commons/success-response')
logger.info(`inside airplane controller`)
async function createAirport(request,response) {
    logger.info('inside createAirport(-) controller')
    try {
       const data = await airportService.createAirport(request.body) 
       SuccessResponse.message='API is live'
       SuccessResponse.data=data
       return response.status(httpStatusCode.Created).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message='API is expereincing problems'
        ErrorResponse.error=error
        logger.error(`something went wrong in createAirport function ${error}`)
        return response.status(error.statusCode).json(ErrorResponse)
    }
}
async function getAllAirports(request,response)
{
    try {
        const airports = await airportService.getAllAirports()
        return response.status(httpStatusCode.Accepted).json({
            success:true,
            message:"API is live",
            error:{},
            data:airports
        })
    } catch (error) {
        logger.error(`something went wrong in getAllAirports function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function getAirport(request,response) {
    try {
       const airport = await airportService.getAirport(request.params.id)
       return response.status(httpStatusCode.Accepted).json({
        success:true,
        message:"API is live",
        error:{},
        data:airport
       })
    } catch (error) {
    //    console.log(error.statusCode,httpStatusCode.NotFound)
        if(error.statusCode===httpStatusCode.NotFound){
           
            return response.status(httpStatusCode.NotFound).json({
                success:false,
                message:"API is having problems",
                error:error.explanation+" Airport",
                data:{}
            })
        }
        logger.error(`something went wrong in getAirport function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function updateAirport(request,response) {
    try {
        const updatedAirport = await airportService.updateAirport(request.params.id,request.body)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:updatedAirport
        })
    } catch (error) {
        logger.error(`something went wrong in updateAirport function ${error}`)
        console.log(error.statusCode)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function deleteAirport(request,response) {
    try {
        const deletedAirport = await airportService.deleteAirport(request.params.id)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:deletedAirport
        })
    } catch (error) {
        logger.error(`something went wrong in deleteAirport function ${error}`)
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
    createAirport,
    getAllAirports,
    getAirport,
    updateAirport,
    deleteAirport
}