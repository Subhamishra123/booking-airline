const { flight } = require('../models')
const { Airplane } = require('../models')
const { Airport } = require('../models')
const { City } = require('../models')
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
                    model:Airplane,
                    required:true
                },
                {
                    model:Airport,
                    as:'DepartureAirport',
                    required:true,
                    include:{
                        model:City,
                        required:true
                    }
                },
                {
                    model:Airport,
                    as:'ArrivalAirport',
                    required:true,
                    include:{
                        model:City,
                        required:true
                    }
                }
            ]
        })
        return response
    }
}

module.exports=FlightRepository