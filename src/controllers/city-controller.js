const { CityService } = require('../services')
const { httpStatusCode } = require('httpstatuscode')
const logger = require('../config/logger-config')
const { ErrorResponse,SuccessResponse } = require('../utils/commons')

async function createACity(request,response)
{
    
    try { 
        logger.info(`inside CityController.createCity(request.body)`)
        const city = await CityService.createCity(request.body)
        SuccessResponse.message="API is live"
        SuccessResponse.data=city
        return response.status(httpStatusCode.Created).json(SuccessResponse)
    } catch (error) {
        logger.error(`something went wrong in create A City function ${error}`)
        ErrorResponse.message="API is expereincing problems"
        ErrorResponse.error=error
       
        return response.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateACity(request,response)
{
    try {
        logger.info(`inside CityController.updateACity function`)
        const city = await CityService.updateCity(request.params.id,request.body)
        SuccessResponse.message="API is live"
        SuccessResponse.data=city
        return response.status(httpStatusCode.Accepted).json(SuccessResponse)
    } catch (error) {
        logger.error(`something went wrong in update a city function ${error}`)
        ErrorResponse.message="API is expereincing problems"
        ErrorResponse.error=error
        return response.status(error.statusCode).json(ErrorResponse)
    }
}

async function deleteACity(request,response)
{
    try {
        logger.info(`inside CityController.deleteACity function`)
        const city = await CityService.deleteCity(request.params.id)
        SuccessResponse.message="API is live"
        SuccessResponse.data=city
        return response.status(httpStatusCode.Accepted).json(SuccessResponse)
    } catch (error) {
        logger.error(`something went wrong in delete a city function ${error}`)
        ErrorResponse.message="API is expereincing problems"
        ErrorResponse.response=error
        return response.status(error.statusCode).json(ErrorResponse)
    }
}
module.exports={
    createACity,
    updateACity,
    deleteACity
}


