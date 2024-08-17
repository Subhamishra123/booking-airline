const { flight } = require('../models')

const { CrudRepository } = require('./crud-repository')

class FlightRepository extends CrudRepository
{
    constructor()
    {
        super(flight)
    }
}

module.exports=FlightRepository