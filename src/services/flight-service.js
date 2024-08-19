const { httpStatusCode } = require('httpstatuscode')
const moment = require('moment');
const { Op } = require('sequelize')
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

async function getAllFlights(query)
{
    //trips=MUM-DEL
    let customFilter={}
    let sortFilter={}
    if(query.trips)
    {
        const [departureAirportId,arrivalAirportId]=query.trips.split('-')
        customFilter.departureAirportId=departureAirportId
        customFilter.arrivalAirportId=arrivalAirportId
    }
    if(query.price)
    {
        const [minPrice,maxPrice]=query.price.split('-')
        customFilter.price={
            [Op.between]:[minPrice,maxPrice===undefined?20000:maxPrice]
        }
    }
    if(query.travellers)
    {
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate)
    {
        const queryTripDate = query.tripDate;
        const startTripTime = '00:00:00';
        const endTripTime = '23:59:00';
       

        // Create UTC equivalent if your database uses UTC
        const startTripDateUTC = moment.utc(`${queryTripDate}T${startTripTime}`).toISOString();
        const endingTripDateUTC = moment.utc(`${queryTripDate}T${endTripTime}`).toISOString();

        customFilter.departureTime = {
            [Op.between]: [startTripDateUTC, endingTripDateUTC]
        };
    }
    if(query.sort)
    {
        //sort=departureTime_ASC,price_DESC
       let sortParams=query.sort.split(',')
       sortFilter = sortParams.map(param=>{
        return param.split('_')
       })
       //console.log(sortFilter)
    }
    try {
        const response = await repository.getAllflights(customFilter,sortFilter)
        return response
    } catch (error) {
        logger.error(`cannot fetch data of all the flights ${error}`)
        throw new AppError(`cannot fetch data of all the flights ${error}`,httpStatusCode.InternalServerError)
    }
}


// async function getAllFlights() {
//     try {
//         logger.info('inside getAllFlights(-)')
//         const response = await repository.getAll()
//         return response
//     } catch (error) {
//         logger.error(`something went wrong in getAllFlights function ${error}`)
//         throw new AppError(`something went wrong in getAllFlights function ${error}`,httpStatusCode.InternalServerError)
//     }
// }
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