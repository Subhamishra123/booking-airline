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

app.listen(PORT,()=>{
    console.log(`express started at port : ${PORT}`)
})