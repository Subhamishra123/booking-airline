const { httpStatusCode } = require('httpstatuscode')
const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/AppError')
const logger = require('../config/logger-config')
const repository = new AirportRepository()
logger.info(`inside airport-service`)
async function createAirport(data)
{
    try {
        logger.info(`inside createAirport(-)`)
        const response = await repository.create(data)
        return response
    } catch (error) {
        let explanation=[]
        if(error.name==='SequelizeValidationError')
        {
            error.errors.forEach(err=>{
                explanation.push(err)
            })
            logger.error(`${explanation}`)
        }
        logger.error(`Cannot create a airport object ${error}`)
        throw new AppError('Cannot create a airport object',httpStatusCode.InternalServerError)
    }

}
async function getAllAirports() {
    try {
        logger.info('inside getAllAirports(-)')
        const response = await repository.getAll()
        return response
    } catch (error) {
        logger.error(`something went wrong in getAllAirports function ${error}`)
        throw new AppError(`something went wrong in getAllAirports function ${error}`,httpStatusCode.InternalServerError)
    }
}
async function getAirport(id) {
    try {
        logger.info('inside getAirport(-)')
        const response = await repository.get(id)
        return response
    } catch (error) {
        logger.error(`something went wrong in getAirport function ${error}`)
        throw new AppError(`something went wrong in getAirport function ${error}`,error.statusCode)
    }
}
async function updateAirport(id,airport) {
    try {
        logger.info('inside updateAirport(-)')
        const response = await repository.update(id,airport)
        return response
    } catch (error) {
        if(error.statusCode===httpStatusCode.NotFound)
        {
            logger.error(`the airplane you requested is not present`)
            throw new AppError("the airplane you requested is not present",httpStatusCode.NotFound)
        }
        logger.error(`something went wrong in updateAirport function ${error}`)
        throw new AppError(`something went wrong in updateAirport function ${error}`,httpStatusCode.InternalServerError)
    }
}
async function deleteAirport(id)
{
    try {
        logger.info('inside deleteAirport(-)')
        const response = await repository.delete(id)
        return response
    } catch (error) {
        if(error.statusCode===httpStatusCode.NotFound)
            {
                logger.error(`the airport you requested is not present`)
                throw new AppError("the airport you requested for is not present",httpStatusCode.NotFound)
            }
            logger.error(`something went wrong in updateAirport function ${error}`)
            throw new AppError(`something went wrong in updateAirport function ${error}`,httpStatusCode.InternalServerError)
    }
}
module.exports={
    createAirport,
    getAllAirports,
    getAirport,
    updateAirport,
    deleteAirport
}