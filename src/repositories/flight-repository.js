const { flight } = require('../models')
const { Airplane } = require('../models')
const { Airport } = require('../models')
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
            order:sortParams,
            include:[
                {
                    model:Airplane
                },
                {
                    model:Airport,
                    as:'DepartureAirport'
                },
                {
                    model:Airport,
                    as:'ArrivalAirport'
                }
            ]
        })
        return response
    }
}

module.exports=FlightRepository