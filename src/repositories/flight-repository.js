const { flight } = require('../models')

const { CrudRepository } = require('./crud-repository')

class FlightRepository extends CrudRepository
{
    constructor()
    {
        super(flight)
    }
    async getAllflights(filter,sortParams)
    {
        const response = await flight.findAll({
            where:filter,
            order:sortParams
        })
        return response
    }
}

module.exports=FlightRepository