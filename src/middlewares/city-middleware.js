const { ErrorResponse } = require('../utils/commons/')
const AppError = require('../utils/errors/AppError')
const { httpStatusCode } = require('httpstatuscode')
function validateCreateCity(request,response,next)
{
    if(!request.body.name)
    {
        ErrorResponse.message="Something went wrong while creating a city"
        ErrorResponse.error=new AppError(["City name not found in the incoming request body"],httpStatusCode.BadRequest)
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    next()
}
function validatePatchRequest(request,response,next)
{
    
    if(!request.body.name)
    {
        ErrorResponse.message="City name field cannot be empty"
        ErrorResponse.error=new AppError(["City name not found in the incoming request body"],httpStatusCode.BadRequest)
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    next()
}
module.exports={
    validateCreateCity,
    validatePatchRequest
}