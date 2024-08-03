const {airplaneService}=require('../services')
const logger =require('../config/logger-config')
const { httpStatusCode } = require('httpstatuscode')

async function createAnAirplane(request,response)
{
    try {
        const data = await airplaneService.createAirplane(request.body)
        return response.status(httpStatusCode.Created).json({
            success:true,
            message:"API is live",
            error:{},
            data:data
        })
    } catch (error) {
        logger.error(`something went wrong in createAnAirplane function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}
async function retreiveAllplanes(request,response)
{
    try {

        const data = await airplaneService.getAllplanes()
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:data
        })
    } catch (error) {
        logger.error(`something went wrong in retreiveAllplanes function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}

async function retreiveAPlane(request,response) {
    try {
        const id = parseInt(request.params.id)
        const data = await airplaneService.getAPlane(id)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:data
        })
    } catch (error) {
        logger.error(`something went wrong in retreiveAPlane function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}

async function updatePlane(request,response) {
    try {
        const id = parseInt(request.params.id)
        const data = await airplaneService.updateAPlane(id,request.body)
        return response.status(httpStatusCode.OK).json({
            success:true,
            message:"API is live",
            error:{},
            data:data
        })
    } catch (error) {
        logger.error(`something went wrong in updatePlane function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is having problems",
            error:error,
            data:{}
        })
    }
}

async function deletePlane(request,response) {
    try {
        const id = parseInt(request.params.id)
        const data = await airplaneService.deleteAPlane(id)
        return response.status(httpStatusCode.Accepted).json({
            success:true,
            message:"API is live",
            data:data,
            error:{}
        })
    } catch (error) {
        logger.error(`something went wrong in deletePlane function ${error}`)
        return response.status(httpStatusCode.InternalServerError).json({
            success:false,
            message:"API is expereincing problems",
            error:error,
            data:{}
        })
    }
}

module.exports={
    createAnAirplane,
    retreiveAllplanes,
    retreiveAPlane,
    updatePlane,
    deletePlane
}