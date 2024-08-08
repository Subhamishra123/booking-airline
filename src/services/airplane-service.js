const { airplaneRepository } = require('../repositories')
const logger =require('../config/logger-config')
const AppError = require('../utils/errors/AppError')
const { httpStatusCode } = require('httpstatuscode')
const repository = new airplaneRepository()
async function createAirplane(data)
{
    try {
        const response=await repository.create(data)
        return response
    } catch (error) {
        logger.error(`something went wrong in createAirplane function ${error}`)
       // console.log(error.name)
        let explanation = []
        if(error.name==='SequelizeValidationError')
        {
            error.errors.forEach(err=>{
                explanation.push(err.message)
            })
            console.log(explanation)
            throw new AppError(explanation,httpStatusCode.BadRequest)
        }
        throw new AppError('Cannot create a new Airplane object',httpStatusCode.InternalServerError)
    }
}


async function getAllplanes()
{
    try {
        const response = await repository.getAll()
        return response
    } catch (error) {
        logger.error(`something went wrong in retreiveAllplanes function ${error}`)
        throw error
    }
}

async function getAPlane(id)
{
    try {
        const response = await repository.get(id)
        return response
    } catch (error) {
        logger.error(`something went wrong in getAPlane function ${error}`)
        if(error.statusCode==httpStatusCode.NotFound)
        {
            throw new AppError("the airplane you requested is not present",httpStatusCode.NotFound)
        }
        throw error
    }
}

async function updateAPlane(id,plane) {
    try {
        const response = await repository.update(id,plane)
        return response
    } catch (error) {
        logger.error(`something went wrong in updateAPlane function ${error}`)
        if(error.statusCode==httpStatusCode.NotFound)
        {
            throw new AppError("the airplane you requested is not present",httpStatusCode.NotFound)
        }
        throw error
    }
}
async function deleteAPlane(id) {
    try {
        const response = await repository.delete(id)
        return response
    } catch (error) {
        logger.error(`something went wrong in deleteAPlane function ${error}`)
        if(error.statusCode==httpStatusCode.NotFound)
            {
                throw new AppError("the airplane you requested is not present",httpStatusCode.NotFound)
            }
        throw error
    }
}
module.exports={
    createAirplane,
    getAllplanes,
    getAPlane,
    updateAPlane,
    deleteAPlane
}