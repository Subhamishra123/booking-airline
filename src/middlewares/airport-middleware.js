const { httpStatusCode } = require('httpstatuscode')
const  AppError  = require('../utils/errors/AppError')
const { ErrorResponse } =require('../utils/commons')
const logger = require('../config/logger-config')
function validateCreateAirportRequest(request,response,next)
{
    logger.info('inside validateCreateAirportRequest')
    ErrorResponse.message="something went wrong while creating airport"

    const {name,code,cityId} = request.body
    
    if(name==undefined)
    {
        ErrorResponse.error=new AppError(["name not entered"],httpStatusCode.BadRequest)
        logger.error('name not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(code==undefined)
    {
        ErrorResponse.error=new AppError(["code not entered"],httpStatusCode.BadRequest)
        logger.error('code not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    if(cityId==undefined)
    {
        ErrorResponse.error=new AppError(["cityId not entered"],httpStatusCode.BadRequest)
        logger.error('cityId not entered')
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    next()
}

module.exports={
    validateCreateAirportRequest
}
