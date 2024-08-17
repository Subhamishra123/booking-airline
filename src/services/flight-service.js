const { httpStatusCode } = require('httpstatuscode')
const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/AppError')
const logger = require('../config/logger-config')
const repository = new FlightRepository()
logger.info(`inside flight-service`)
async function createFlight(data)
{
    try {
        logger.info(`inside createFlight(-)`)
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
        logger.error(`Cannot create a flight object ${error}`)
        throw new AppError('Cannot create a flight object',httpStatusCode.InternalServerError)
    }

}
async function getAllFlights() {
    try {
        logger.info('inside getAllFlights(-)')
        const response = await repository.getAll()
        return response
    } catch (error) {
        logger.error(`something went wrong in getAllFlights function ${error}`)
        throw new AppError(`something went wrong in getAllFlights function ${error}`,httpStatusCode.InternalServerError)
    }
}
async function getFlight(id) {
    try {
        logger.info('inside getFlight(-)')
        const response = await repository.get(id)
        return response
    } catch (error) {
        logger.error(`something went wrong in getFlight function ${error}`)
        throw new AppError(`something went wrong in getFlight function ${error}`,error.statusCode)
    }
}
async function updateFlight(id,airport) {
    try {
        logger.info('inside updateFlight(-)')
        const response = await repository.update(id,airport)
        return response
    } catch (error) {
        if(error.statusCode===httpStatusCode.NotFound)
        {
            logger.error(`the flight you requested is not present`)
            throw new AppError("the flight you requested is not present",httpStatusCode.NotFound)
        }
        logger.error(`something went wrong in updateFlight function ${error}`)
        throw new AppError(`something went wrong in updateFlight function ${error}`,httpStatusCode.InternalServerError)
    }
}
async function deleteFlight(id)
{
    try {
        logger.info('inside deleteFlight(-)')
        const response = await repository.delete(id)
        return response
    } catch (error) {
        if(error.statusCode===httpStatusCode.NotFound)
            {
                logger.error(`the flight you requested is not present`)
                throw new AppError("the flight you requested for is not present",httpStatusCode.NotFound)
            }
            logger.error(`something went wrong in deleteFlight function ${error}`)
            throw new AppError(`something went wrong in deleteFlight function ${error}`,httpStatusCode.InternalServerError)
    }
}
module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateFlight,
    deleteFlight
}