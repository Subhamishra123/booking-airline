const { airplaneRepository } = require('../repositories')
const logger =require('../config/logger-config')
const repository = new airplaneRepository()
async function createAirplane(data)
{
    try {
        const response=await repository.create(data)
        return response
    } catch (error) {
        logger.error(`something went wrong in createAirplane function ${error}`)
        throw error
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
        throw error
    }
}

async function updateAPlane(id,plane) {
    try {
        const response = await repository.update(id,plane)
        return response
    } catch (error) {
        logger.error(`something went wrong in updateAPlane function ${error}`)
        throw error
    }
}
async function deleteAPlane(id) {
    try {
        const response = await repository.delete(id)
        return response
    } catch (error) {
        logger.error(`something went wrong in deleteAPlane function ${error}`)
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