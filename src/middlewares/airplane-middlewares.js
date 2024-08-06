const { httpStatusCode } = require('httpstatuscode')
const {ErrorResponse} = require('../utils/commons')
const AppError = require('../utils/errors/AppError')
function validateCreateRequest(request,response,next)
{
    ErrorResponse.message="something went wrong while creating airplane"

    ErrorResponse.error=new AppError(["something went wrong with the incoming request body model number"],httpStatusCode.BadRequest)

  //  ErrorResponse.error={explanation:"something went wrong with the incoming request body model number"}
    if(!request.body.modelNumber)
    {
        return response.status(httpStatusCode.BadRequest).json(ErrorResponse)
    }
    next()
}
module.exports={
    validateCreateRequest
}