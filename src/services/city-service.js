const { CityRepository } = require('../repositories')
const logger = require('../config/logger-config')
const  AppError  = require('../utils/errors/AppError')
const { httpStatusCode } = require('httpstatuscode')
const repository = new CityRepository()
async function createCity(data)
{
    try {
        logger.info(`inside createCity service`)
        const response = await repository.create(data)  
        return response      
    } catch (error) {
        logger.error(`unable to create city ${error}`)
        if(error.name=='SequelizeUniqueConstraintError')
        {
            let explanation= []
            error.errors.forEach(err=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,httpStatusCode.Conflict)
        }
       
        throw new AppError(`unable to create city ${error}`,httpStatusCode.InternalServerError)
    }
}

async function updateCity(id,data)
{
    try {
        logger.info("inside Cityservice.updateCity")
        const city = await repository.update(id,data)
       // logger.info(JSON.stringify(city))
        return city
    } catch (error) {
        logger.error(`something went wrong in update city function ${error}`)
      
        if(error.statusCode==httpStatusCode.NotFound)
        {
            throw new AppError(error.explanation+" City",error.statusCode)
        }
        throw error
    }
}


async function deleteCity(id)
{
    try {
        logger.info("inside Cityservice.deleteCity")
        const city = await repository.delete(id)
        return city
    } catch (error) {
        logger.error(`something went wrong in update city function ${error}`)
        if(error.statusCode==httpStatusCode.NotFound)
        {
            throw new AppError(error.explanation+" City",error.statusCode)
        }
        throw error
    }
}






module.exports={
    createCity,
    updateCity,
    deleteCity
}