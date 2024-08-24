const { flight } = require('../models')
const { Airplane } = require('../models')
const { Airport } = require('../models')
const { City } = require('../models')
const { CrudRepository } = require('./crud-repository')
const db = require('../models')
const { addRowLockonFlights }=require('./queries')
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

    async  updateRemainingSeats(flightId,seats,dec=true)
    {
        const transaction = await db.sequelize.transaction()
        //'0'->inc seats,any other number dec seats
        try {
            //put a row lock in mysql for any kind of update we do
            await db.sequelize.query(addRowLockonFlights(flightId))
            const flightToBeUpdated = await flight.findByPk(flightId)
       
            if(+dec)
            {
                await flightToBeUpdated.decrement('totalSeats',{by:seats},{transaction:transaction})
            }
            else{
                await flightToBeUpdated.increment('totalSeats',{by:seats},{transaction:transaction})
            }
            await transaction.commit()
            return flightToBeUpdated
        } catch (error) {
            await transaction.rollback()
            throw error
        }
        //await transaction.commit()
    }
}

module.exports=FlightRepository