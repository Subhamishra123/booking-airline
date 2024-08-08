const express=require('express')
const airplaneRouter = require('./airplane-routes')
const { cityRouter } = require('./city-routes')
const {InfoController} = require('../../controllers')
const router=express.Router()
router.get('/info',InfoController.info)
router.use('/airplane',airplaneRouter)
router.use('/city',cityRouter)
module.exports=router