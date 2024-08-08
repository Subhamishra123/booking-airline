const app = require('express')
const cityRouter = app.Router()
const { CityMiddleware } = require('../../middlewares')
const { CityController } = require('../../controllers')
cityRouter.post('/',CityMiddleware.validateCreateCity,CityController.createACity)
cityRouter.patch('/:id',CityMiddleware.validatePatchRequest,CityController.updateACity)
cityRouter.delete('/:id',CityController.deleteACity)
module.exports={
    cityRouter
}