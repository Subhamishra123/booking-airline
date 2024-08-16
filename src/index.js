const express=require('express')
const bodyParser=require('body-parser')
const {PORT} = require('./config')
const apiRouter=require('./routes')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',apiRouter)
app.get('/',(request,response)=>{
    return response.status(200).json({
        "message":"ok"
    })
})

app.listen(PORT,async()=>{
    console.log(`express started at port : ${PORT}`)

    // const { Airport , City } = require('./models')
    // const city = await City.findByPk(2)
    // console.log(city)

    // const airport=await Airport.create({name:'kampegowda airpot',code:'BLR'})
    // console.log(airport)
    // const airport = await city.createAirport({name:'kampegowda airpot',code:'BLR'})
    // console.log(airport)
    // const airportsInBlr = await city.getAirports()
    // console.log("=========")
    // console.log(airportsInBlr)
    // console.log("=========")
    // const hbairport=await city.createAirport({name:'Hubali Airport',code:'HBL'})
    // console.log(hbairport)

    // console.log("=========")
    // console.log(airportsInBlr)
    // await city.removeAirport(airportsInBlr)

})