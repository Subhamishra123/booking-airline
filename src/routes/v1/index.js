const express=require('express')
const airplaneRouter = require('./airplane-routes')
const {InfoController} = require('../../controllers')
const router=express.Router()
router.get('/info',InfoController.info)
router.use('/airplane',airplaneRouter)
module.exports=router